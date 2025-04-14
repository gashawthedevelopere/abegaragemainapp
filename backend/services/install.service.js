// // Import the query function from the config file
// import conn from '../config/db.config.js'; 
// // Import the fs module to read the SQL file 
// import fs from 'fs';

// // Write a function to create the database table 
// async function install() {
//     // Create a variable to hold the path to the sql file 
//     const queryFile =__dirname + '/sql/initial.sql';
//     //console.log(queryFile);
    
//     // Temporary variable used to store all queries
//     let queries = []; 
//     let finalMessage = {}; 
//     let templine = '';
    
//     // Read the SQL file
//      const lines = await fs.readFileSync(queryFile, 'utf-8').split('\n');

//       // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables  
//       const executed = await new Promise((resolve, reject) => {
//         // Iterate over all lines
//         lines.forEach((line) => {
//           if (line.trim().startsWith('--') || line.trim() === '') {
//             // Skip if it's a comment or empty line
//             return;
//           }
//           templine += line;
//           if (line.trim().endsWith(';')) {
//             // If it has a semicolon at the end, it's the end of the query
//             // Prepare the individual query 
//             const sqlQuery = templine.trim();
//             // Add query to the list of queries 
//             queries.push(sqlQuery);
//             templine = '';
//           }
//         });
//         resolve("Queries are added to the list");
//       });
//       //Loop through the queries and execute them one by one asynchronously  
//       for (let i = 0; i < queries.length; i++) {
//         try {
//           const result = await conn.query(queries[i]);
//           console.log("Table created");
//         } catch (err) {
//           // console.log("Err Occurred - Table not created");
//           finalMessage.message = "Not all tables are created";
//         }
//       }
//       // Prepare the final message to return to the controller 
//       if (!finalMessage.message) {
//         finalMessage.message = "All tables are created";
//         finalMessage.status = 200;
//       } else {
//         finalMessage.status = 500;
//       }
//       // Return the final message
//       return finalMessage;
//     }
//     // Export the install function for use in the controller
// export default {install}; // Don't forget to export the function

import conn from '../config/db.config.js'; 
import fs from 'fs/promises'; // Promise-based file system
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function install() {
    const queryFile = `${__dirname}/sql/initial-queries.sql`; 
    console.log("Using SQL file:", queryFile);
    
    let queries = []; 
    let finalMessage = { message: "", status: null }; 
    let templine = '';
    
    try {
        const data = await fs.readFile(queryFile, 'utf-8');
        const lines = data.split('\n');

        lines.forEach((line) => {
            if (line.trim().startsWith('--') || line.trim() === '') {
                return; // Skip comments and empty lines
            }
            templine += line;
            if (line.trim().endsWith(';')) {
                queries.push(templine.trim());
                templine = ''; // Reset for the next query
            }
        });

        // Execute each query in the array
        for (let sqlQuery of queries) {
            try {
                await conn.query(sqlQuery); // Execute the SQL query
                console.log("Query executed successfully:", sqlQuery);
            } catch (err) {
                console.error("Error executing query:", err);
                finalMessage.message = "Not all tables are created";
                finalMessage.status = 500;
                break; // Stop execution on the first error
            }
        }
        
        // If all queries were successful
        if (!finalMessage.message) {
            finalMessage.message = "All tables are created";
            finalMessage.status = 200;
        }

    } catch (err) {
        console.error("Error reading the SQL file:", err);
        finalMessage.message = "Error processing SQL file";
        finalMessage.status = 500;
    }

    return finalMessage; // Return the final message
}

export default { install };