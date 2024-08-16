// src/utils/errorHandler.js
export const handleApiError = (error, enqueueSnackbar) => {
    console.log('Full error:', error);

    let errorMessage = 'An unexpected error occurred. Please try again later.';

    if (error.response) {
        // Server responded with a status other than 2xx
        const { data, status } = error.response;

        // Log error response data and status
        console.log('Error response data:', data);
        console.log('Error response status:', status);

        if (data && data.message) {
            // Use the error message from the response if available
            errorMessage = data.message;
        } else {
            // Fallback to default messages based on status code
            switch (status) {
                case 400:
                    errorMessage = 'Bad request. Please check your input.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please log in again.';
                    break;
                case 403:
                    errorMessage = 'Forbidden. You do not have access.';
                    break;
                case 404:
                    errorMessage = 'Resource not found.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = 'An error occurred. Please try again.';
            }
        }
    } else if (error.request) {
        // No response was received from the server
        errorMessage = 'No response from the server. Please check your connection.';
        console.log('Error request:', error.request);
    } else {
        // Something happened in setting up the request
        errorMessage = 'Error in setting up the request.';
        console.log('Request setup error:', error.message);
    }

    enqueueSnackbar(errorMessage, { variant: 'error' });
};
