'use strict'

const express = require('express')
const { of: futureOf } = require('fluture')
const R = require('rambdax')

const wo = require('../utils/web-operators')
const m = require('../models/dto/account.model')


exports.createAccountRouter = R.curry((logger, lg) => {

    const router = express.Router()

    /**
     * GET /accounts/:id
     * Gets account by id
     */
    router.get('/:id', (req, res) => futureOf(req.params)
        .map(lg.logicValidateAccount(m.AccountDetailQuery))
        .chain(validationResult => validationResult.matchWith({
            Error: ({ value }) => R.compose(futureOf, wo.createInvalidResult(value)),
            Ok: ({ value }) => lg.logicFindAccountById(m.AccountDetailResult, value),
        }))
        .forkCatch(
            // Handle unexpected error
            err => wo.logAndThrowError(logger, res, err),
            // Handle rejection
            wo.serverError(logger, res),
            // Handle completion
            (findResult) => findResult.matchWith({
                Nothing: () => wo.okJson(res, null),
                Just: ({ value }) => wo.okJson(res, value),
            })
        )
    )

    /**
     * GET /accounts
     * Gets all accounts
     */
    router.get('/', (req, res) => futureOf()
        .chain(() => lg.logicFindAccounts(m.AccountDetailResult, null, null))
        .forkCatch(
            // Handle unexpected error
            err => wo.logAndThrowError(logger, res, err),
            // Handle rejection
            wo.serverError(logger, res),
            // Handle completion
            (findResult) => findResult.matchWith({
                Nothing: () => wo.okJson(res, null),
                Just: ({ value }) => wo.okJson(res, value),
            })
        )
    )

    /**
     * POST /accounts
     * Creates new account
     */
    router.post('/', (req, res) => futureOf(req.body)
        .map(lg.logicValidateAccount(m.AccountCreateCommand))
        .chain(validationResult => validationResult.matchWith({
            Error: ({ value }) => R.compose(futureOf, wo.createInvalidResult)(value),
            Ok: ({ value }) => lg.logicCreateAccount(m.AccountCreateResult, value),
        }))
        .forkCatch(
            // Handle unexpected error
            err => wo.logAndThrowError(logger, res, err),
            // Handle rejection
            wo.serverError(logger, res),
            // Handle completion
            (findResult) => findResult.matchWith({
                Error: ({ value }) => wo.clientError(logger, res, value.status, value.error),
                Ok: ({ value }) => wo.createdJson(res, value),
            })
        )
    )

    /**
     * PUT /accounts
     * Replaces an existing account
     */
    router.put('/', (req, res) => futureOf(req.body)
        .map(lg.logicValidateAccount(m.AccountUpdateCommand))
        .chain(validationResult => validationResult.matchWith({
            Error: ({ value }) => R.compose(futureOf, wo.createInvalidResult)(value),
            Ok: ({ value }) => lg.logicUpdateAccount(m.AccountUpdateResult, value),
        }))
        .forkCatch(
            // Handle unexpected error
            err => wo.logAndThrowError(logger, res, err),
            // Handle rejection
            wo.serverError(logger, res),
            // Handle completion
            (findResult) => findResult.matchWith({
                Error: ({ value }) => wo.clientError(logger, res, value.status, value.error),
                Ok: ({ value }) => wo.okJson(res, value),
            })
        )
    )

    /**
     * DELETE /accounts/:id
     * Permanently deletes an account
     */
    router.delete('/:id', (req, res) => futureOf(req.params)
        .map(lg.logicValidateAccount(m.AccountDeleteCommand))
        .chain(validationResult => validationResult.matchWith({
            Error: ({ value }) => R.compose(futureOf, wo.createInvalidResult)(value),
            Ok: ({ value }) => lg.logicDeleteAccount(m.AccountDeleteResult, value),
        }))
        .forkCatch(
            // Handle unexpected error
            err => wo.logAndThrowError(logger, res, err),
            // Handle rejection
            wo.serverError(logger, res),
            // Handle completion
            (findResult) => findResult.matchWith({
                Error: ({ value }) => wo.clientError(logger, res, value.status, value.error),
                Ok: ({ value }) => wo.okJson(res, value),
            })
        )
    )

    return router
})
