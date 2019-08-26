import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css'

import Home from './Pages/Home'
import Auth from './Pages/Auth'
import BookDetail from './Pages/BookDetail';

class App extends React.Component {
  constructor(props){
    super(props)
    const isLoggedIn = window.localStorage.getItem("token") !== null
    this.state = {
      loggedIn: isLoggedIn
    }
  }

  render(){
    return (
      <div className='App'>
        <Router>
        <Route
            exact={true}
            path={'/'}
            render={() => {
              return this.state.loggedIn ? 
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
            component={(url) => {
              return <BookDetail bookUrl={`http://localhost:3030/books/${url.match.params.id}`}/>;
            }} 
          />
          <Route
            path={'/login'}
            render={() => {
              return <Auth  />;
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return <Auth  />;
            }}
          />
        </Router>
      </div>
    )
  }
}

export default App
