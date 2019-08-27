const initState = {
  genresList:[],
  isLoading:false,
  isRejected:false,
  isFulfilled:false,
}
const genre = (state = initState, action)=>{
  switch(action.type){
    case 'GET_GENRES_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'GET_GENRES_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'GET_GENRES_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        genresList: action.payload.data.data
      }
    case 'ADD_GENRES_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'ADD_GENRES_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'ADD_GENRES_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        genresList: state.genresList.push(action.payload.data.data)
      }
    case 'EDIT_GENRES_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'EDIT_GENRES_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'EDIT_GENRES_FULFILLED':
      const newGenreData = action.payload.data.data
      return{
        ...state,
        isLoading:false,
        isFulfilled:true,
        genresList: state.genresList.map((genre)=>{return genre.id == newGenreData.id ? newGenreData : genre})
      }
    case 'DELETE_GENRES_PENDING':
      return{
        ...state,
        isLoading:true,
        isRejected:false,
        isFulfilled:false,
      }
    case 'DELETE_GENRES_REJECTED':
      return{
        ...state,
        isLoading:false,
        isRejected:true,
      }
    case 'DELETE_GENRES_FULFILLED':
      return{
        ...state,
        isLoading:false,
        isFulfilled:true, 
        genresList: state.genresList.filter((genre)=>{return genre.id != action.payload.data.data.id})
      }
    default:
      return state
  }
}
export default genre