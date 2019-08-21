import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'

import Home from './Pages/Home'
import Auth from './Pages/Auth'
class App extends React.Component {

  render(){
    return (
      <div className='App'>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <Router>
          <Route
            path={'/home'}
            render={() => {
              return <Home  />;
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
