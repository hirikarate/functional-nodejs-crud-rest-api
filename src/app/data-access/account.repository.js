'use strict'

const re = require('./repository')
const { AccountEntity } = require('../models/entities/account.entity')

const createAccountRepository = (dbOps) => {
    const fn = {}

    fn.repoInsertAccount = re.repoInsert(dbOps.dbInsert, AccountEntity)

    fn.repoQueryAccounts = re.repoQuery(dbOps.dbSelect, AccountEntity)
    
    fn.repoQueryAccountById = re.repoQueryById(dbOps.dbSelectById, AccountEntity)

    fn.repoPatchAccount = re.repoPatch(dbOps.dbPatch, AccountEntity)

    fn.repoUpdateAccount = re.repoUpdate(dbOps.dbUpdate, AccountEntity)

    fn.repoDeleteAccount = re.repoDelete(dbOps.dbDelete, AccountEntity)

	return fn

}

module.exports = { createAccountRepository }
