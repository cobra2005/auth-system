export default function notFoundHandler(req, res) {
    return res.status(404).send({
        success: false,
        message: 'Route not found',
        error: {
            statusCode: 404,
            details: ['Route not found'],
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString(),
        },
    });
}