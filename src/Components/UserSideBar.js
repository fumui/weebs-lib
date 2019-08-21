import React from 'react'
import '../App.css'

class UserSideBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: props.username || "dummy",
      image: props.image || "https://previews.123rf.com/images/jeremywhat/jeremywhat1106/jeremywhat110600966/9895276-round-half-tone-images-round-black-white-pattern-design.jpg",
      email: props.email || "dummy@gmail.com",
      level: props.level || "regular",
    }
  }

  render(){
    return (
    <div>
      <img src={this.state.image} alt="user"  className="User-picture"/>
      <h5>{this.state.username}</h5>
    </div>)
  }
}
export default UserSideBar