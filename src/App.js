import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { API_URL } from './config'
import "./index.css"
import { setFetchingUser, setToken, setUser } from './reducers/userReducer'
import axios from 'axios'
import Login from './pages/Login';
import Register from './pages/Register';
import ConnectWallet from './pages/ConnectWallet';
import Home from './pages/Home/Home';


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

]);



export default function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const token = useSelector((state) => state.user.token)
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

  const fetchCurrentUser = async () => {
    try {
      // dispatch(setFetchingUser(true))
      // const res = await axios.get(API_URL + "/currentUser", {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${jwtToken}`
      //   }
      // });
      // console.log("current user==========", res.data)
      // dispatch(setUser(res.data))
      // if (res.data.chosenCategory) {
      //   dispatch(setDefaultCategory(res.data.chosenCategory))
      // }
      // dispatch(setFetchingUser(false))
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


