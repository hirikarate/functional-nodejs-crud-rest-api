'use strict'

const R = require('rambdax')
const FT = require('folktale')

/**
 * Sends a JSON response to client
 * (number, any, object) => object
 */
exports.sendJson = R.curry((response, status, value) => {
    const res = response.status(status)
    value != null ? res.json(value) : res.end()
    return res
})

exports.clientError = R.curry((logger, response, status, err) => {
    logger.error('Client error:', err)
    return exports.sendJson(response, status || 412, err)
})

exports.serverError = R.curry((logger, response, err) => {
    logger.error('Server-side error:', err)
    response.sendStatus(500)
})

exports.logAndThrowError = (logger, response, err) => {
    exports.serverError(logger, response, err)
    // Re-throw to force the process to restart
    process.nextTick(() => { throw err })
}

exports.okJson = R.curry((response, value) => {
    exports.sendJson(response, 200, value)
})

exports.createdJson = R.curry((response, value) => {
    exports.sendJson(response, 201, value)
})


/**
 * number => object|string => object
 */
const errResponse = R.curry((status, error) => ({ status, error }))
exports.createErrorResponse = errResponse

/**
 * number => object|string => Result.Error
 */
const errResult = R.curry(R.compose(FT.result.Error, errResponse))
exports.createErrorResult = errResult

/**
 * object|string => object
 */
const clientBlame = errResponse(412)
exports.createClientBlame = clientBlame


/**
 * object|string => Result.Error
 */
const clientBlameResult = R.compose(FT.result.Error, clientBlame)
exports.createClientBlameResult = clientBlameResult

/**
 * Wraps an validation error in a Result
 * object => Result<string, {status, error}>
 */
exports.createInvalidResult = (err) => errResult(412, err.details != null ? err.details : err)
