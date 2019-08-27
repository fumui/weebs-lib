const initState = {
  booksList:[],
  yearsList:[],
  popularBooksList:[],
  isLoading:false,
  isRejected:false,
  isFulfilled:false,
}
const book = (state = initState, action)=>{
  switch(action.type){
    case 'GET_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'GET_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        booksList: action.payload.data.data
      }
    case 'ADD_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'ADD_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'ADD_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        booksList: state.booksList.push(action.payload.data.data)
      }
    case 'EDIT_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'EDIT_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'EDIT_BOOKS_FULFILLED':
      const newBookData = action.payload.data.data
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        booksList: state.booksList.map((book)=>{return book.id == newBookData.id ? newBookData : book})
      }
    case 'DELETE_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'DELETE_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'DELETE_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true, 
        booksList: state.booksList.filter((book)=>{return book.id != action.payload.data.data.id})
      }
    case 'GET_BOOK_YEARS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BOOK_YEARS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'GET_BOOK_YEARS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        yearsList: action.payload.data.data
      }
    case 'GET_POPULAR_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_POPULAR_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'GET_POPULAR_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        popularBooksList: action.payload.data.data
      }
    default:
      return state
  }
}
export default book