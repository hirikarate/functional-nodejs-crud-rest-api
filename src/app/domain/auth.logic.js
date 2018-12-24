'use strict'

const jwt = require('jsonwebtoken')
const Joi = require('joi')
const FL = require('fluture')
const R = require('ramda')
const Result = require('folktale/result')

/**
 * Checks if given credentials are valid
 */
exports.authenticate = (repoQueryAccounts, credentials) => {
    return repoQueryAccounts(credentials, ['id', 'username', 'fullname', 'role'])
        .map(maybeAccList => maybeAccList.map(R.head))
}

/**
 * Generates authentication token
 */
exports.createAuthToken = (appConfig, payload) => FL.Future((reject, resolve) => {
    // console.log({ payload })
    jwt.sign({ username: payload.username, id: payload.id }, appConfig.auth.secret, 
    // Config
    {
        issuer: appConfig.auth.issuer,
    }, (err, token) => (err
        ? reject(err)
        : resolve(token)))
})

const credentialSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
})

/**
 * Validates login credentials
 */
exports.validateCredentials = (credentials, schema = credentialSchema) => {
    const { error, value } = schema.validate(credentials)
    return error ? Result.Error(error) : Result.Ok(value)
}
