import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { API_URL } from './config'
import "./index.css"
import { setFetchingUser, setJwtToken, setUser } from './reducers/userReducer'
import axios from 'axios'
import Login from './pages/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Login />,
  },
  
]);


export default function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'referrer']);
  const jwtToken = useSelector((state) => state.user.jwtToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (cookies && cookies.token && jwtToken === null) {
      dispatch(setJwtToken(cookies["token"]));
    }
  }, [cookies])

  useEffect(() => {
    console.log("cookies==================", cookies)
    if (jwtToken) {
      fetchCurrentUser();
      setCookie('token', jwtToken, {
        path: "/",
        maxAge: 31536000
      });
    }
  }, [jwtToken])

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
    <RouterProvider router={router} />
  )
}


