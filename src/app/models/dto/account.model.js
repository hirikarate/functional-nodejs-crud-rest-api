'use strict'

const Joi = require('joi')

const { CommandDTOBase, ResultDTOBase, idSchema, idRule } = require('./model')
const { createTranslator } = require('../../utils/model-translator')

const schemaCreate = Joi.object().keys({
    username: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    fullname: Joi.string().min(1).max(100).required(),
})

const schemaPatch = schemaCreate.keys({
    id: idRule,
    username: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(100).optional(),
    password: Joi.string().min(6).max(100).optional(),
    fullname: Joi.string().min(1).max(100).optional(),
})

const schemaReplace = schemaCreate.keys({
    id: idRule,
    password: Joi.string().min(6).max(100).optional(),
})


/**
 * Request DTO for account creating endpoint
 */
class AccountCreateCommand extends CommandDTOBase {
    /**
     * @override
     */
    static get objectSchema() {
        return schemaCreate
    }

    constructor() {
        super()
        this.username = undefined
        this.password = undefined
        this.role = undefined
        this.fullname = undefined
    }
}
AccountCreateCommand['_translator'] = createTranslator(AccountCreateCommand)
exports.AccountCreateCommand = AccountCreateCommand


/**
 * Request DTO for account creating endpoint
 */
class AccountCreateResult extends ResultDTOBase {
    constructor() {
        super()
        this.id = undefined
    }
}
AccountCreateResult['_translator'] = createTranslator(AccountCreateResult)
exports.AccountCreateResult = AccountCreateResult


/**
 * Request DTO for account updating endpoint
 */
class AccountUpdateCommand extends AccountCreateCommand {
    /**
     * @override
     */
    static get objectSchema() {
        return schemaReplace
    }

    constructor() {
        super()
        this.id = undefined
    }
}
AccountUpdateCommand['_translator'] = createTranslator(AccountUpdateCommand)
exports.AccountUpdateCommand = AccountUpdateCommand


/**
 * Response DTO for account updating endpoint
 */
class AccountUpdateResult extends AccountCreateResult {
}
AccountUpdateCommand['_translator'] = createTranslator(AccountUpdateCommand)
exports.AccountUpdateResult = AccountUpdateResult

/**
 * Request DTO for account patching endpoint
 */
class AccountPatchCommand extends AccountUpdateCommand {
    /**
     * @override
     */
    static get objectSchema() {
        return schemaPatch
    }
}
AccountPatchCommand['_translator'] = createTranslator(AccountPatchCommand)
exports.AccountPatchCommand = AccountPatchCommand


/**
 * Response DTO for account patching endpoint
 */
class AccountPatchResult extends AccountUpdateResult {
}
AccountPatchResult['_translator'] = createTranslator(AccountPatchResult)
exports.AccountPatchResult = AccountPatchResult


class AccountDetailQuery extends CommandDTOBase {
    /**
     * @override
     */
    static get objectSchema() {
        return idSchema
    }

    constructor() {
        super()
        this.id = undefined
    }
}
AccountDetailQuery['_translator'] = createTranslator(AccountDetailQuery)
exports.AccountDetailQuery = AccountDetailQuery


/**
 * Response DTO for account detail endpoint
 */
class AccountDetailResult extends AccountCreateResult {
    constructor() {
        super()
        this.id = undefined
        this.username = undefined
        this.role = undefined
        this.fullname = undefined
    }
}
AccountDetailResult['_translator'] = createTranslator(AccountDetailResult)
exports.AccountDetailResult = AccountDetailResult


class AccountDeleteCommand extends CommandDTOBase {
    /**
     * @override
     */
    static get objectSchema() {
        return idSchema
    }

    constructor() {
        super()
        this.id = undefined
    }
}
AccountDeleteCommand['_translator'] = createTranslator(AccountDeleteCommand)
exports.AccountDeleteCommand = AccountDeleteCommand


/**
 * Response DTO for account delete endpoint
 */
class AccountDeleteResult extends AccountCreateResult {
    constructor() {
        super()
        this.id = undefined
        this.username = undefined
        this.role = undefined
        this.fullname = undefined
    }
}
AccountDeleteResult['_translator'] = createTranslator(AccountDeleteResult)
exports.AccountDeleteResult = AccountDeleteResult
