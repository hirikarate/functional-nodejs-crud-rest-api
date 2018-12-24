'use strict'

const R = require("rambdax");

const dbOperations = require('../data-access/pg-operations')
const { createAccountRepository } = require('../data-access/account.repository')
const { createAccountLogic } = require('../domain/account.logic')
const { createAccountRouter } = require('../web/account.router')

const accountRepo = createAccountRepository(dbOperations)
const accountLogic = createAccountLogic(accountRepo)
const accountRouter = createAccountRouter(console, accountLogic)

const initAccountRoute = R.pipe(
    () => createAccountRepository(dbOperations),
    createAccountLogic,
    createAccountRouter(console),
)

module.exports = {
    initAccountRoute,
}
