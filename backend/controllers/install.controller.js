
// Import the install service
import installService from '../services/install.service.js'; 

// Create a function to handle the install request
async function install(req, res, next) {
    try {
        // Call the install service to create the database table
        const installMessage = await installService.install(); // Accessing the install method from the service

        // Check if the install was successful or not and send an appropriate message to client
        if (installMessage.status === 200) {
            res.status(200).json({
                message: installMessage
            });
        } else {
            res.status(500).json({
                message: installMessage
            });
        }
    } catch (error) {
        console.error('Error in install controller:', error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

// Export the function
export default { install }; // Make sure you're exporting correctly