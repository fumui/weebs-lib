const initState = {
   borrowingData:undefined,
   borrowingHistoryData:[],
   errMessage:'',
   message:'',
   isLoading:false,
   isRejected:false,
   isFulfilled:false,
}
const borrowing = (state = initState, action) => {
  switch(action.type){
    case 'BORROW_BOOK_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'BORROW_BOOK_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'BORROW_BOOK_FULFILLED':
      console.log(state)
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingData:action.payload.data.data
      }
    case 'RETURN_BOOK_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'RETURN_BOOK_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'RETURN_BOOK_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingData:action.payload.data.data
      }
    case 'GET_LATEST_BOOK_BORROWING_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_LATEST_BOOK_BORROWING_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_LATEST_BOOK_BORROWING_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingData:action.payload.data.data
      }
    case 'GET_BORROWING_HISTORY_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BORROWING_HISTORY_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BORROWING_HISTORY_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingHistoryData:action.payload.data.data
      }
    default:
      return state
  }
}
export default borrowing