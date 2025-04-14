// Import the express module 
import express from 'express'
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
import installRouter from './install.routes.js';
// Import the employee routes 
import employeeRouter from './employee.routes.js';
// Import the login routes 
import loginRoutes from "./login.routes.js"
// Add the install router to the main router 
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Export the router
export default  router; 