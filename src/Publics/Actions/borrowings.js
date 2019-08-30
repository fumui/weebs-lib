import Axios from 'axios';
export const borrow = (data) => {
  return {
    type:'BORROW_BOOK',
    payload: Axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}/borrowings/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const returnBook = (data) => {
  return {
    type:'RETURN_BOOK',
    payload: Axios.patch(`http://${process.env.REACT_APP_BACKEND_HOST}/borrowings/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}

export const getLatestBorrowingByBookId = (id) => {
  return {
    type:'GET_LATEST_BOOK_BORROWING',
    payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/borrowings/book/${id}`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}

export const getBorrowingHistory = () => {
  return {
    type:'GET_BORROWING_HISTORY',
    payload: Axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}/borrowings/history`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}