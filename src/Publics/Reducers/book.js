const initState = {
  booksList:[],
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
          booksList: action.payload.data.data
        }
    default:
      return state
  }
}
export default book