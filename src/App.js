import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { API_URL } from './config'
import "./index.css"
import { setContract, setFetchingUser, setToken, setUser } from './reducers/userReducer'
import axios from 'axios'
import Login from './pages/Login';
import Register from './pages/Register';
import ConnectWallet from './pages/ConnectWallet';
import Home from './pages/Home/Home';

import Web3 from "web3";
import abi from "./abi.json"
import Book from './pages/Book/Book';
import Dashboard from './pages/Dashboard/Dasboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/connectWallet",
    element: <ConnectWallet />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/book/:id",
    element: <Book />,
  },

]);



export default function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { token, wallet, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (cookies && cookies.token && token === null) {
      dispatch(setToken(cookies["token"]));
    }
  }, [cookies])

  useEffect(() => {
    console.log("cookies==================", cookies)
    if (token) {
      fetchCurrentUser();
      setCookie('token', token, {
        path: "/",
        maxAge: 31536000
      });
    }
  }, [token])

  useEffect(() => {
    if (wallet) {
      updateWallet();
      loadWeb3();
      loadBlockchainData();
    }
  }, [wallet])


  const updateWallet = async () => {
    try {
      console.log("updating wallet==============")
      const res = await axios.post(API_URL + '/registerAddress', {
        email: user.email,
        address: wallet
      }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

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

    const contractdemo = new web3.eth.Contract(
      abi,
      "0x1b1CD7068C6411a8CF8b67DbC014fD670495b666",
      { from: wallet, gas: 150000, gasPrice: "30000000000" }
    );
    dispatch(setContract(contractdemo));
  }

  const fetchCurrentUser = async () => {
    try {
      dispatch(setFetchingUser(true))
      const res = await axios.get(API_URL + "/findUserByToken/" + token, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("current user==========", res.data)
      dispatch(setUser(res.data))

      dispatch(setFetchingUser(false))
    } catch (e) {
      dispatch(setFetchingUser(false))
      console.log(e)
    }
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


