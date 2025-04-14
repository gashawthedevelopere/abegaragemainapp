//import the dotenv pakcahge
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import employeeService from '../services/employee.service.js';
//A function to verify the token recieved from the frontend
const verifyToken=async(req,res,next)=>{
    let token =req.headers('x-access-token');
    if(!token){
        return res.status(403).send({
            status:"Fail",
            message:"No token provided!"
        });
    }
    //
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                status:"Fail",
                message:"Unauthorized!"
            })
        }
        //
        req.employee_email=decoded.employee_email;
        next();
    });
}
//Function to checkif the user is an admin
const isAdmin=async(req,res,next)=>{
   // let token=req.headers["x-access-token"];
    //console.log(req.employee_email);
    const employee_email=req.employee_email;
    const employee=await employeeService.getEmployeeByEmail(employee_email)
    if(employee[0].company_role_id===3){
        next()
    }
    else{
        return res.status(403).send({
            status:"Fail",
            message:"Not an Admin"
        });

    }
}
const authMiddleware={
    verifyToken,isAdmin
}
export default  authMiddleware;