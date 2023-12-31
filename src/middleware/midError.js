class ErrorInfo {
    notFound = (req, res, next) => {
        const error = new Error(
            `Not Found - ${req.originalUrl}`
        );
        res.status(404);
        next(error);
    };

    errorHandler = (error, req, res, next) => {
        let statusCode = res.statusCode === 200 ?
            500 : res.statusCode;
        let message = error.message;
        res.status(statusCode).json({
            message: message,
            stack: error.stack
        });
        next(error);
    };
};

export const ERR = new ErrorInfo();



