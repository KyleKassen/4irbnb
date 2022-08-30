const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        let errorObj = {}
        const errors = validationErrors
            .array()
            .map((error) => errorObj[error.param] = `${error.msg}`);
            // .reduce((prev, curr) => prev.curr = `${curr.msg}`)

        const err = Error('Validation error');
        err.errors = errorObj;
        err.status = 400;
        // err.title = 'Bad request.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors
};
