import Axios from 'axios';
export const borrow = (data) => {
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
export const returnBook = (data) => {
  return {
    type:'RETURN_BOOK',
    payload: Axios.patch(`http://localhost:3030/borrowings/`,data,{
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
    payload: Axios.get(`http://localhost:3030/borrowings/book/${id}`,{
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
    payload: Axios.get(`http://localhost:3030/borrowings/history`,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}