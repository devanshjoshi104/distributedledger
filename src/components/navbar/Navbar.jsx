import React from "react";
import Web3 from "web3";
import { useState } from "react";
// import { WalletW } from "../assets";
import './navbar.css'
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="navbar-outer">
      <div className="container navbar">
        <div className="fw-sb">Decentralized Library</div>
        <ul className="navbar-list">
          <li className={"navbar-list-item fw-m" + (location.pathname === '/' ? ' c-3 ' : ' gray-1')} onClick={() => navigate('/')}>Home</li>
          <li className={"navbar-list-item fw-m" + (location.pathname === '/dashboard' ? ' c-3 ' : ' gray-1')} onClick={() => navigate('/dashboard')}>Dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
