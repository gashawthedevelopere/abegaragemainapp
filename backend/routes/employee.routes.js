// Import the express module  
import express from 'express'
// Call the router method from express to create the router 
const router = express.Router();
// Import the employee controller
import employeeController from '../controllers/employee.controller.js';
// Import middleware 
import authMiddleware  from "../middlewares/auth.middleware.js";
// Create a route to handle the add employee request on post
router.post("/api/employee", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
// Export the router
// Export the router
export default router;