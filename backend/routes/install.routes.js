//import the express module
import express from 'express';
//call the router method from express to create the router
const router=express.Router();
//import install controller
import installController from '../controllers/install.controller.js';
//create a route to handle the install request on get
router.get('/install',installController.install);
//export the router
export default router;
