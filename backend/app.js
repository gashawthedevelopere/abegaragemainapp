// //import the express
// import express from 'express';

// //import the dotenv module and call the config method to load the env variable
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// //Create a variable to hold our port number
// const port=process.env.PORT;
// //import the router
// import router from './routes/index.js';
// import sanitize from 'sanitize'
// import cors from 'cors'
// //create the web server
//  const app=express();
//  app.use(cors(corsOption));
//  //setup the cors option to allow request from our front end
//  const corsOption={
//     origin:process.env.FRONTEND_URL,
//     optionSuccessfulStatus:200
//  };
//  //Add the express .json middleware to the application
//  app.use(express.json())
//  //Add the sanitizer to express middleware
//  app.use(sanitize.middleware);
// //Add the routes to the application as middleware
// app.use(router)
// //start the webserver
// app.listen(port,(req,res)=>{
//     console.log(`Server Running on port:${port}`)
// })
// export default app;

// Import the express
import express from 'express';

// Import the dotenv module and call the config method to load the env variable
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a variable to hold our port number
const port = process.env.PORT; // Provide a default port if not specified

// Import the router
import router from './routes/index.js';
import sanitize from 'sanitize';
import cors from 'cors';

// Setup the CORS options to allow requests from our frontend
const corsOption = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
};

// Create the web server
const app = express();

// Add the express .json middleware to the application
app.use(express.json());

// Add the sanitizer to express middleware
app.use(sanitize.middleware);

// Use CORS middleware
app.use(cors(corsOption));

// Add the routes to the application as middleware
app.use(router);

// Start the web server
app.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
});

export default app;