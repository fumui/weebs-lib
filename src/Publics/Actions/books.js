import Axios from 'axios'
const token = window.localStorage.getItem("token")
export const getBooks = (dataSource, page = 1, sortby, search) => {
  let url = `${dataSource}?page=${page}`
  if(sortby !== null)
    url += `&sortby=${sortby}`
  if(search !== null )
    url += `&search=${search}`

  return {
    type:'GET_BOOKS',
    payload: Axios.get(url,{
        headers:{
          Authorization : token
        }
      }
    )
  }
}
export const getBookById = (id) => {
  return {
    type:'GET_BOOK_BY_ID',
    payload: Axios.get(`http://localhost:3030/books/${id}`,{
        headers:{
          Authorization : token
        }
      }
    )
  }
}
export const addBook = (data) => {
  return {
    type:'ADD_BOOKS',
    payload: Axios.post('http://localhost:3030/books', data, {
        headers:{
          Authorization : token
        }
      }
    )
  }
}
export const deleteBook = (id) => {
  return {
    type:'DELETE_BOOKS',
    payload: Axios.delete(`http://localhost:3030/books/${id}`,{
        headers:{
          Authorization : token
        }
      }
    )
  }
}
export const editBook = (id, data) => {
  return {
    type:'EDIT_BOOKS',
    payload: Axios.patch(`http://localhost:3030/books/${id}`, data,{
        headers:{
          Authorization : token
        }
      }
    )
  }
}

export const getBookYears = () => {
  return {
    type:'GET_BOOK_YEARS',
    payload: Axios.get('http://localhost:3030/books/year/',{
        headers:{
          Authorization : token
        }
      }
    )
  }
}

export const getPopularBooks = () => {
  return {
    type:'GET_POPULAR_BOOKS',
    payload: Axios.get('http://localhost:3030/books/popular',{
        headers:{
          Authorization : token
        }
      }
    )
  }
}
