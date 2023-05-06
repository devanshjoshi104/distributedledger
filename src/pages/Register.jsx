import { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signup } from '../actions/authActions';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(false)

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: "",
        enrollmentNumber: "",
        bhawan: '',
        branch: '',
        year: '',
    })
    const onSignup = async () => {
        try {
            const res = await dispatch(signup(data));
            navigate('/login', {
                state: {
                    message: 'Activation link sent to your email address. Kindly login after activating your account.'
                }
            })
        } catch (e) {
            console.log(e.message)
            setError(e.message)
        }
    }

    return (
        <div className='bg-gray-3'>
            <div className='container login-outer-cnt'>
                <div className='fs-1 fw-sb'>
                    Welcome to the Decentralized Library
                </div>
                <div className="login-cnt">
                    <div className='fw-sb' style={{ marginBottom: '1rem' }}>Register account</div>
                    <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className='login-input' type="email" name="Email" placeholder='Email' />
                    <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className='login-input' type="password" name="Password" placeholder='Password' />
                    <input value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} className='login-input' type="password" name="Password" placeholder='Retype Password' />
                    <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className='login-input' type="text" name="name" placeholder='Full Name' />
                    <input value={data.enrollmentNumber} onChange={(e) => setData({ ...data, enrollmentNumber: e.target.value })} className='login-input' type="text" name="EnrollNumber" placeholder='Enrollment Number' />
                    <input value={data.bhawan} onChange={(e) => setData({ ...data, bhawan: e.target.value })} className='login-input' type="text" name="Bhawan" placeholder='Bhawan' />
                    <input value={data.branch} onChange={(e) => setData({ ...data, branch: e.target.value })} className='login-input' type="text" name="Branch" placeholder='Branch' />
                    <input value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} className='login-input' type="number" name="Year" placeholder='Year' />
                    <button className='btn login-btn bg-3 c-white fw-sb' onClick={onSignup}>Register</button>
                    <button onClick={() => navigate('/login')} className='btn login-btn bg-white c-3 fw-sb'>Already have an account ? Signin </button>

                </div>
            </div>
        </div>
    )
}
