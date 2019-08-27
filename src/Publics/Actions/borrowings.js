import Axios from 'axios';
export const addBook = (data) => {
  return {
    type:'BORROW_BOOK',
    payload: Axios.post(`http://localhost:3030/borrowings/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}