
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  // Set the response status code and send the error message
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message || 'An unexpected error occurred',
  });
}

export default errorHandler;