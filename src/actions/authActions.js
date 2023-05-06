import axios from 'axios'
import { API_URL } from '../config'
import { setUser, setToken } from '../reducers/userReducer'

export const signup = (data) => async (dispatch) => {
    try {
        console.log('registering user====================')
        Object.keys(data).map(key => {
            if (data[key] === '') {
                throw Error('Please enter ' + key)
            }
        })
        if (data.password !== data.confirmPassword) {
            throw Error('Passwords do not match')
        }
        let newAccount = {
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "password2": data.password,
            "enrollmentNo": data.enrollmentNumber,
            "BhawanName": data.bhawan,
            "Branch": data.branch,
            "Year": data.year,
        }
        const res = await axios.post(API_URL + "/auth/register", newAccount);
        console.log(res.data);

        return res;

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const login = (data) => async (dispatch) => {
    try {
        console.log("logging in user=================");
        if (data.email === "" || data.password === "") {
            throw new Error("Invalid credentials")
        }
        const res = await axios.post(API_URL + '/auth/login', data)
        console.log(res.data);
        dispatch(setToken(res.data.token))
        dispatch(setUser(res.data.user))
    } catch (e) {
        console.log(e)
        throw e;
    }
}
