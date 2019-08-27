import {combineReducers} from 'redux'

import book from './book';
import genre from './genre';
import user from './user';

const rootReducer = combineReducers({
  user,
  genre,
  book,
})

export default rootReducer