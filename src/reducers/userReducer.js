import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    fetchingUser: false,
    wallet: null,
    contract: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFetchingUser: (state, action) => {
      state.fetchingUser = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setContract,setWallet, setToken, setUser, setFetchingUser } = userReducer.actions

export default userReducer.reducer