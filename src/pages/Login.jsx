import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import '../styles/login.css'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.user)

    const [creds, setCreds] = useState({
        email: '',
        password: ''
    })

    const onClickLogin = async () => {
        try {
            const res = await dispatch(login(creds))
            console.log(user)
            if (user) {
                navigate('/connectWallet')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='bg-gray-3'>
            <div className='container login-outer-cnt'>
                <div className='fs-1 fw-sb'>
                    Welcome to the Decentralized Library
                </div>
                <div className="login-cnt">
                    <div className='fw-sb' style={{ marginBottom: "1rem" }}>Login</div>
                    <div className='c-3 fs-4 fw-sb'>
                        {location && location.state && location.state.message}
                    </div>
                    <input value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} className='login-input' type="email" name="Email" placeholder='Email' />
                    <input value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} className='login-input' type="password" name="Password" placeholder='Password' />
                    <button className='btn login-btn bg-3 c-white fw-sb' onClick={onClickLogin}>Login</button>
                    <button onClick={() => navigate('/register')} className='btn login-btn bg-white c-3 fw-sb'>Create an account ?</button>
                </div>
            </div>
        </div>
    )
}
