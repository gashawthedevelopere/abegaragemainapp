// Import the query function from the db.config.js file 
import  conn from "../config/db.config.js";
// Import the bcrypt module to do the password comparison 
import  bcrypt from 'bcrypt';
// Import the employee service to get employee by email  
import  employeeService from "./employee.service.js";
// Handle employee login 
async function logIn(employeeData) {
  try {
    let returnData = {}; // Object to be returned
    const employee = await employeeService.getEmployeeByEmail(employeeData.employee_email);
    if (employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist"
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(employeeData.employee_password, employee[0].employee_password_hashed);
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password"
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: employee[0]
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// Export the function 
export default  {
  logIn
};