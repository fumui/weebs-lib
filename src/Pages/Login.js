import React from 'react';

import Library from "../library picture.svg";

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return(
      <div>
        <img src={Library} alt="Library" className="Library-picture"/>
      </div>
    )
  }
}
export default Login