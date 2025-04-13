import React from 'react'
//import the auth hook
import { useAuth } from '../../../Context/AuthContext.jsx'
//import the login component
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
//import the adminmenu components

import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu.jsx'
//Add employees component
import EmployeesList from '../../components/Admin/EmployeesList/EmployeesList.jsx'

const  Employees =() =>{
  //destructure the auth hook
  const {isLogged,isAdmin}=useAuth();
  if(isLogged){
    if(isAdmin){
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
               <EmployeesList/>
              </div>
            </div>
          </div>
        </div>
      );

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
