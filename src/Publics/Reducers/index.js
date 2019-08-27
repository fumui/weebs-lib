import {combineReducers} from 'redux'

import book from './book';
import genre from './genre';
import user from './user';
import borrowing from './borrowing';

const rootReducer = combineReducers({
  borrowing,
  user,
  genre,
  book,
})

export default rootReducer