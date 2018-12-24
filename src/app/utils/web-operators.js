"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("rambda");
const folktale_1 = require("folktale");
const fluture_1 = require("fluture");
/**
 * Sends a JSON response to client
 * (number, any, object) => object
 */
exports.sendJson = R.curry((response, status, value) => {
    const res = response.status(status);
    value != null ? res.json(value) : res.end();
    return res;
});
exports.clientError = R.curry((logger, response, status, err) => {
    logger.error('Client error:', err);
    return exports.sendJson(response)(status || 412)(err);
});
exports.serverError = R.curry((logger, response, err) => {
    logger.error('Server-side error:', err);
    response.sendStatus(500);
});
exports.logAndThrowError = (logger, response, err) => {
    exports.serverError(logger, response, err);
    // Re-throw to force the process to retart
    process.nextTick(() => { throw err; });
};
exports.okJson = R.curry((logger, response, value) => {
    // logger.debug(value)
    exports.sendJson(response)(200)(value);
});
exports.createdJson = R.curry((logger, response, value) => {
    // logger.debug(value)
    exports.sendJson(response)(201)(value);
});
exports.createClientBlame = (error) => ({ status: 412, error });
exports.createErrorResponse = (status, error) => ({ status, error });
exports.createErrorResult = (status, error) => folktale_1.result.Error({ status, error });
/**
 * Wraps an validation error in a Result
 * `object => Result<string, {status, error}>`
 */
exports.createInvalidResult = (err) => exports.createErrorResult(412, err.details != null ? err.details : err);
/**
 * Executes a Future task.
 */
const execTaskFn = (logger, response, completeHandler, task) => {
    return task.forkCatch(
    // Handle unexpected error
    err => exports.logAndThrowError(logger, response, err), 
    // Handle rejection
    exports.serverError(logger, response), 
    // Handle completion
    completeHandler);
};
exports.execTask = R.curry(execTaskFn);
/**
 * Executes a Future task and responds OK result to client if success.
 */
const execGetQueryFn = (logger, response, task) => {
    const completeHandler = (outcome) => outcome.matchWith({
        Nothing: () => exports.okJson(logger, response, null),
        Just: ({ value }) => exports.okJson(logger, response, value),
    });
    return execTaskFn(logger, response, completeHandler, task);
};
exports.execGetQuery = R.curry(execGetQueryFn);
/**
 * Executes a Future task and responds OK result to client if success.
 */
const execCommandFn = (logger, response, successHandler, task) => {
    successHandler = successHandler || (({ value }) => exports.okJson(logger, response, value));
    const completeHandler = (outcome) => {
        return outcome.matchWith({
            Error: ({ value }) => exports.clientError(logger, response, value.status, value.error),
            Ok: successHandler,
        });
    };
    return execTaskFn(logger, response, completeHandler, task);
};
exports.execCommand = R.curry(execCommandFn);
/**
 * Executes a Future task and responds OK result to client if success.
 */
const execCreateCommandFn = (logger, response, task) => {
    const successHandler = ({ value }) => exports.createdJson(logger, response, value);
    return execCommandFn(logger, response, successHandler, task);
};
exports.execCreateCommand = R.curry(execCreateCommandFn);
const isInstanceofResult = (obj) => {
    return (folktale_1.result.Ok.prototype.isPrototypeOf(obj) || folktale_1.result.Error.prototype.isPrototypeOf(obj));
};
const validateTaskFn = (validateFn, successHandler, task) => {
    return task.map(validateFn) // => Future<Result>
        .chain(validationResult => validationResult.matchWith({
        Error: ({ value }) => R.compose(fluture_1.of, exports.createInvalidResult)(value),
        Ok: ({ value }) => successHandler(value),
    }))
        .map(val => (isInstanceofResult(val) ? val : folktale_1.result.Ok(val)));
};
exports.validateTask = R.curry(validateTaskFn);
//# sourceMappingURL=web-operators.js.map