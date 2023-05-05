import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
    jwtToken: null,
    fetchingUser:false,
  },
  reducers: {
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFetchingUser: (state, action) => {
      state.fetchingUser = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setJwtToken, setUser,setFetchingUser } = userReducer.actions

export default userReducer.reducer