import Axios from 'axios'

export const getGenres = () => {
  return {
    type:'GET_GENRES',
    payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/genres`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}

export const addGenre = (data) => {
  return {
    type:'ADD_GENRES',
    payload: Axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}/genres`, data, {
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const deleteGenre = (id) => {
  return {
    type:'DELETE_GENRES',
    payload: Axios.delete(`http://${process.env.REACT_APP_BACKEND_HOST}/genres/${id}`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const editGenre = (id, data) => {
  return {
    type:'EDIT_GENRES',
    payload: Axios.patch(`http://${process.env.REACT_APP_BACKEND_HOST}/genres/${id}`, data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}