import React from 'react'
//import the auth hook
import { useAuth } from '../../../Context/AuthContext.jsx'
//import the login component
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
const  Employees =() =>{
  //destructure the auth hook
  const {isLogged,isAdmin}=useAuth();
  if(isLogged){
    if(isAdmin){
      return (
        <div>
          <h1>Employee Page</h1>
        </div>
      )
    }
    else{
    return (
      <div><h1>You are not authorized to access the requested page</h1></div>
    )
    }
  }
  else{
    <div>
      <LoginForm/>
    </div>
  }
  
}

export default Employees
