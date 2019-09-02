import Axios from 'axios'

export const login = (data) => {
  return {
    type:'LOGIN',
    payload: Axios.post(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/users/login`, data)
  }
}
export const register = (data) => {
  return {
    type:'REGISTER',
    payload: Axios.post(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/users/register`, data)
  }
}
export const getProfile = () => {
  return {
    type:'GET_PROFILE',
    payload: Axios.get(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/users/profile`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const logout = () => {
  return {
    type:'USER_LOGOUT',
  }
}