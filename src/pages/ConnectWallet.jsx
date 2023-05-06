import React from "react";
import Web3 from "web3";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWallet } from "../reducers/userReducer";

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch()
    // ***************************** Wallet Connection ************************

    const detectCurrentProvider = () => {
        let provider;

        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("No wallet Detected, Please install MetaMask !!!");
        }
        return provider;
    };

    const onConnect = async () => {
        setIsConnected(!isConnected);
        try {
            const currentProvider = detectCurrentProvider();

            if (currentProvider) {
                await currentProvider.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                dispatch(setWallet(account))
                setIsConnected(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ******************************************************************

    return (
        <div className="container" style={{ minHeight: "100vh", display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
            <div className="fs-1 fw-sb gray-1" style={{ marginBottom: "3rem" }}>
                Connect your metamask wallet
            </div>
            <button className="btn fs-3 fw-sb bg-3 c-white" onClick={onConnect}>Proceed</button>
        </div>
    );
};

export default Navbar;
