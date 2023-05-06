import React, { useEffect, useState } from "react";
import Home from "./pages/Models";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModelInfo from "./pages/ModelInfo";
import Web3 from "web3";
import tokenContractABI from "./tokenContractABI.json";
import dataSharingModelABI from "./dataSharingModelABI.json";

function Demo() {
    const [account, setAccount] = useState(null);
    const [dataSchemes, setDataSchemes] = useState([]);
    const [tokenContract, setTokenContract] = useState(null);
    const [dataSharingModelContract, setdataSharingModelContract] = useState(null);

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        // Network ID
        const networkId = await web3.eth.net.getId();
        // const networkData = DTube.networks[networkId];
        // if (networkData) {
        const tokenContract = new web3.eth.Contract(
            tokenContractABI,
            "0xe97ACcc0d3bfA32516CB334937aFE6207d3b96a2",
            { from: account, gas: 150000, gasPrice: "30000000000" }
        );
        setTokenContract(tokenContract);

        const dataSharingModelContract = new web3.eth.Contract(
            dataSharingModelABI,
            "0x9ab3E178949e277Dc69752d43E1eBA07B99ee5b1",
            { from: account, gas: 150000, gasPrice: "30000000000" }
        );

        setdataSharingModelContract(dataSharingModelContract);

        await dataSharingModelContract.methods.getAllDataSchemes().call().then((data_schemes) => { setDataSchemes(data_schemes) });

        // setState({ dtube });
        // const videosCount = await dtube.methods.videoCount().call();
        // setState({ videosCount });
        // Load videos, sort by newest
        // for (var i = videosCount; i >= 1; i--) {
        //   const video = await dtube.methods.videos(i).call();
        //   this.setState({
        //     videos: [...this.state.videos, video],
        //   });
        // }
        //Set latest video with title to view as default
        //   const latest = await dtube.methods.videos(videosCount).call();
        //   this.setState({
        //     currentHash: latest.hash,
        //     currentTitle: latest.title,
        //   });
        //   this.setState({ loading: false });
        // } else {
        //   window.alert("DTube contract not deployed to detected network.");
        // }
    };

    return (

        <div className="App">
            <div>
                <p>
                    Account: {account}
                </p>
            </div>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home DataSchemes={dataSchemes} />} />
                    <Route path="/datamodels" exact element={<Home DataSchemes={dataSchemes} />} />
                    <Route path="/datamodels/:id" exact element={<ModelInfo TokenContract={tokenContract} DataContract={dataSharingModelContract} Account={account} />} />
                    {/* <Route path="/theme" exact element={<Themes />} /> */}
                    {/* <Route path="/adv-comittee" exact element={<AdvisoryComittee />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;