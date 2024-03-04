import {configureStore} from '@reduxjs/toolkit'
import matricReducer from './MatricSlice';

const store = configureStore({
  reducer: {
    matric: matricReducer
  }
})
export default store;