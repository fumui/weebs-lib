import Axios from 'axios';
export const borrow = (data) => {
  return {
    type:'BORROW_BOOK',
    payload: Axios.post(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/`,data,{
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
    payload: Axios.patch(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/`,data,{
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
    payload: Axios.get(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/book/${id}`,{
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
    payload: Axios.get(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/history`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const getBorrowingRequests = () => {
  return {
    type:'GET_BORROWING_REQUESTS',
    payload: Axios.get(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/requests`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}
export const confirmBorrowingRequests = (id,book_id) => {
  const data = {id,book_id}
  return {
    type:'CONFIRM_BORROWING_REQUESTS',
    payload: Axios.patch(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/confirm`,data,{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    }
    )
  }
}
export const rejectBorrowingRequests = (id) => {
  return {
    type:'REJECT_BORROWING_REQUESTS',
    payload: Axios.delete(`${process.env.REACT_APP_LOCAL_BACKEND_HOST}/borrowings/${id}`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}