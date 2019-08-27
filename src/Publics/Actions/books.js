import Axios from 'axios'

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
          Authorization : window.localStorage.getItem("token")
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
          Authorization : window.localStorage.getItem("token")
        }
      }
    )
  }
}