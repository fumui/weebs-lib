const initState = {
  booksList:[],
  yearsList:[],
  bookGenresList:[],
  popularBooksList:[],
  donatedBooksList:[],
  page:undefined,
  errMessage:'',
  message:'',
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
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BOOKS_FULFILLED':
        // action.payload.data.data.map(book => state.booksList.push(book))
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        booksList:action.payload.data.data,
        page:action.payload.data.page
      }
    case 'GET_BOOK_BY_ID_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BOOK_BY_ID_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BOOK_BY_ID_FULFILLED':
      state.booksList.push(action.payload.data.data[0])
      return{
        ...state,
        isLoading:false,
        isFulfilled:true
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
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'ADD_BOOKS_FULFILLED':
      state.booksList.unshift(action.payload.data.data)
      return{
        ...state,
        isLoading:false,
        isFulfilled:true
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
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'EDIT_BOOKS_FULFILLED':
      const newBookData = action.payload.data.data[0]
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        booksList: state.booksList.map((book)=>{return Number(book.id) === Number(newBookData.id) ? newBookData : book})
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
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'DELETE_BOOKS_FULFILLED':
      let deletedBook= state.booksList.filter((book)=>{return Number(book.id) !== Number(action.payload.data.data.id)})
      deletedBook.deleted = true
      return{
        ...state,
        isLoading:false,
        isFulfilled:true, 
        booksList: state.booksList.map((book)=>{return Number(book.id) === Number(deletedBook.id) ? deletedBook : book})
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
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BOOK_YEARS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        yearsList: action.payload.data.data
      }
    case 'GET_BOOK_GENRES_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BOOK_GENRES_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BOOK_GENRES_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        bookGenresList: action.payload.data.data
      }
    case 'GET_NEWEST_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_NEWEST_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_NEWEST_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        popularBooksList: action.payload.data.data
      }
    case 'GET_DONATION_BOOKS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_DONATION_BOOKS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
        donatedBooksList: []
      }
    case 'GET_DONATION_BOOKS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        donatedBooksList: action.payload.data.data
      }
    case 'SET_BOOK_AVALIABILITY':
      let bookData = state.booksList.find((book)=>{return book.id === Number(action.payload.bookId)})
      bookData.availability = action.payload.availability
      return{
        ...state,
        booksList: state.booksList.map((book)=>{return Number(book.id) === Number(bookData.id) ? bookData : book})
      }
    default:
      return state
  }
}
export default book