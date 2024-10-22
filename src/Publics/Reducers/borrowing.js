const initState = {
   borrowingData:undefined,
   borrowingHistoryData:[],
   borrowingRequestsData:[],
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
      const data = action.payload.data.data
      console.log(state)
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingData:data
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
    case 'GET_BORROWING_REQUESTS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_BORROWING_REQUESTS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        borrowingRequestsData:[],
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'GET_BORROWING_REQUESTS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        borrowingRequestsData:action.payload.data.data
      }
    case 'CONFIRM_BORROWING_REQUESTS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'CONFIRM_BORROWING_REQUESTS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'CONFIRM_BORROWING_REQUESTS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
      }
    case 'REJECT_BORROWING_REQUESTS_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'REJECT_BORROWING_REQUESTS_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
        errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message,
      }
    case 'REJECT_BORROWING_REQUESTS_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
      }
    default:
      return state
  }
}
export default borrowing