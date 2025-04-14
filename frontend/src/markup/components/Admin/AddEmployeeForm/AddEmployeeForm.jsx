import React, { useState } from "react";
//import the employee service
import employeeService from "../../../../services/employee.service.jsx";
//import the hook useAuth
//import { useAuth } from "../../../../Context/AuthContext.jsx";
function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhone] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActiveEmployee] = useState("1");
  const [company_role_id, setCompany_role_id] = useState(1);
  //to handle user to comunicate easily error
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [PhoneNumberRequired, setPhoneNumberRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  //Create a variable t hold the users token
  // let loggedInEmployeeToken='';
  // //Destructure the auth hook and get the token
  // const {employee}=useAuth();
  // if(employee){
  //   loggedInEmployeeToken=employee.employee_token;
  // }
  //to handle the form
  const HandleSubmit = (e) => {
    //prevent the default behavior of the form
    e.preventDefault();
    let valid = true; //flag togive symbol action continue or not
    if (!employee_first_name) {
      setFirstNameRequired("First name required");
    } else {
      setFirstNameRequired("");
    }
    //email validation
    if (!employee_email) {
      setEmailError("Email is required");
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    //password validation and password length min 6 digit
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 character");
      valid = false;
    } else {
      setPasswordError("");
    }
    //if the form is not  valid ,do not submit
    if (!valid) {
      return;
    }
    const formData={
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id
    };
    //pass the formdata to service
    const newEmployee=employeeService.createEmployee(formData)
   newEmployee.then(response=>response.json())
   .then((data)=>{
    //console.log(data)
    //if error is returned from API server,set set the server message
    if(data.error){
      setServerError(data.error)
    }else{
      //handle successfull response
      setSuccess(true);
      setServerError('');
      //Redirect to the employee age after 2 seconnd
      //for now,just redirect to the home page
      setTimeout(()=>{
        //windows.location.href='/admin/employees'
        window.location.href='/';

      },200)
    }


   })
   //handle catch
   .catch((error)=>{
    const resMessage=
    (error.response && error.response.data &&
      error.response.data.message
    )|| error.toString();
    setServerError(resMessage);
   });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={HandleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error">{serverError}</div>
                      )}
                      <input
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        name="employee_email"
                        placeholder="Employee email"
                      />
                      {emailError && (
                        <div className="validation-error">{emailError}</div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        value={employee_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        type="text"
                        name="employee_first_name"
                        placeholder="Employee first name"
                      />
                      {firstNameRequired}
                      <div className="validation-error">
                        {firstNameRequired}
                      </div>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        value={employee_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        type="text"
                        name="employee_last_name"
                        placeholder="Employee last name"
                        required
                      />
                      {lastNameRequired}
                      <div className="validation error">{lastNameRequired}</div>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        value={employee_phone}
                        onChange={(event) => setPhone(event.target.value)}
                        type="text"
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                      {PhoneNumberRequired}
                      <div className="validation-error">
                        {PhoneNumberRequired}
                      </div>
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        value={company_role_id}
                        onChange={(event) =>
                          setCompany_role_id(event.target.value)
                        }
                        name="employee_role"
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        value={employee_password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        name="employee_password"
                        placeholder="Employee password"
                      />
                      {passwordError}
                      <div className="validation-error">{passwordError}</div>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add employee</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
