import {combineReducers} from 'redux'

import book from './book';
import genre from './genre';
import user from './user';
import borrowing from './borrowing';

const appReducer = combineReducers({
  borrowing,
  user,
  genre,
  book,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer