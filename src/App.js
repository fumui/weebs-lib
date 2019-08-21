import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css'

import Home from './Pages/Home'
import Auth from './Pages/Auth'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
    const isLoggedIn = document.cookie.includes("token")
    this.setState({loggedIn:isLoggedIn})
  }

  componentDidMount(){
    const isLoggedIn = document.cookie.includes("token")
    if(this.state.loggedIn !== isLoggedIn){
      this.setState({loggedIn:isLoggedIn})
    }
  }
  render(){
    return (
      <div className='App'>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
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
            render={() => {
              return <Home />
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
