import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './reducers/userReducer'
// import  appReducer  from './reducers/app'

export default configureStore({
  reducer: {
    user:userReducer,
    // contest:contestReducer,
    // app:appReducer
  },
})