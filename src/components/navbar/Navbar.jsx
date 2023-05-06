import React from "react";
import Web3 from "web3";
import { useState } from "react";
// import { WalletW } from "../assets";
import './navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);

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
        setIsConnected(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ******************************************************************

  return (
    <div className="navbar-outer">
      <div className="container navbar">
        <div>DBE</div>
        <ul className="navbar-list">
          <li className="navbar-list-item">Home</li>
          <li className="navbar-list-item">Dashboard</li>
        </ul>
        <button className="btn bg-3 c-white">Connect Wallet</button>
      </div>
    </div>
  );
};

export default Navbar;
