import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css'

import Home from './Pages/Home'
import Auth from './Pages/Auth'
import BookDetail from './Pages/BookDetail';

const App=()=> {
  return (
    <div className='App'>
      <Router>
      <Route
          exact={true}
          path={'/'}
          render={() => {
            return window.localStorage.getItem("token") !== null ? 
            <Redirect to="./home"/>
            :
            <Redirect to="./login"/>;
          }}
        />
        <Route
          path={'/home'}
          render={({history}) => {
            return <Home history={history}/>
          }}
        />
        <Route
          path={'/book/:id'}
          component={({match,history}) => {
            return <BookDetail history={history} bookId={match.params.id} bookUrl={`http://localhost:3030/books/${match.params.id}`} key={history.location}/>;
          }} 
        />
        <Route
          path={'/login'}
          render={({history}) => {
            return <Auth history={history}/>;
          }}
        />
        <Route
          path={'/register'}
          render={({history}) => {
            return <Auth history={history}/>;
          }}
        />
      </Router>
    </div>
  )
}

export default App
