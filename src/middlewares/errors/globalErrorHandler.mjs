export default function globalErrorHandler(err, req, res) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    console.error(`[${new Date().toISOString()}] Error:`, {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: err.stack,
        ...(err.errors && { validationErrors: err.errors }) // Log lỗi validation nếu có
    });

    const response = {
        success: false,
        message,
        error: {
            code: statusCode,
            ...(process.env.NODE_ENV === 'development' && {
                stack: err.stack,
                details: err.errors // Chi tiết lỗi validation
            })
        }
    };

    if (err.name === 'ValidationError') {
        // Mongoose Validation Error
        response.message = 'Validation Failed';
        response.error.errors = Object.values(err.errors).map(e => e.message);
        response.error.code = 400;
    }

    if (err.code === 11000) {
        // MongoDB Duplicate Key Error
        response.message = 'Duplicate Field Value';
        response.error.code = 409;
        const field = Object.keys(err.keyValue)[0];
        response.error.field = field;
    }

    return res.status(statusCode).json(response);
}