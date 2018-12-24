'use strict'

const lg = require('./logic')

exports.logicFindAccounts = ((repoQueryAccounts, ResponseClass, condition, projection) => {
    const transformAccounts = accounts => accounts.map(ResponseClass.from)
    const transformMaybe = maybeAccounts => maybeAccounts.map(transformAccounts)
    return repoQueryAccounts(condition, projection).map(transformMaybe)
})

exports.logicCreateAccount = lg.logicCreate

exports.logicUpdateAccount = lg.logicUpdate

exports.logicDeleteAccount = lg.logicDelete

exports.logicValidateAccount = lg.logicValidateObject

exports.logicValidateAccountId = lg.logicValidateId
