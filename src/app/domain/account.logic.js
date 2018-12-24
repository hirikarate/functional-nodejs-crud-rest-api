'use strict'

const R = require('rambdax')
const { of: futureOf } = require('fluture')
const FT = require('folktale')

const lg = require('./logic')
const wo = require('../utils/web-operators')


const createAccountLogic = (repo) => {
    const fn = {}

    fn.logicFindAccounts = lg.logicFind(repo.repoQueryAccounts)
    
    fn.logicFindAccountById = lg.logicFindById(repo.repoQueryAccountById)

    fn.logicCreateAccount = lg.logicCreate(repo.repoInsertAccount)

    fn.logicUpdateAccount = lg.logicUpdate(repo.repoUpdateAccount)


    fn.logicDeleteAccount = (ResponseClass, { id }) => {
        const delAcc = () => repo.repoDeleteAccount(id)
            .map(rowCount => FT.result.Ok(rowCount
                ? ResponseClass.from({ id })
                : null)
            )
        const createErr = R.compose(futureOf, wo.createClientBlameResult, R.always('Cannot delete last account'))

        return repo.repoQueryAccounts(null, null)
            .chain(maybe => maybe.matchWith({
                Nothing: R.compose(futureOf, FT.result.Ok, R.always(null)),
                Just: R.ifElse(({ value }) => value.length > 1, delAcc, createErr),
            }))
    }


    fn.logicValidateAccount = lg.logicValidateObject

    return fn

}

module.exports = { createAccountLogic }
