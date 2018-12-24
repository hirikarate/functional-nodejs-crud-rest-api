'use strict'

const Joi = require('joi')
const common_1 = require('@micro-fleet/common')
const { CommandDTOBase, ResultDTOBase } = require('./model')

const schemaCreate = Joi.object().keys({
    username: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().max(20).required(),
    fullname: Joi.string().min(1).max(100).required(),
})

const schemaReplace = schemaCreate.keys({
    id: Joi.string().regex(/^[0-9]+$/).required(),
    password: Joi.string().min(6).max(100).optional(),
})
/**
 * Request DTO for account creating endpoint
 */
class AccountCreateCommand extends CommandDTOBase {
    constructor() {
        super(...arguments)
        this.username = undefined
        this.password = undefined
        this.role = undefined
        this.fullname = undefined
    }
    /**
     * @override
     */
    static get objectSchema() {
        return schemaCreate
    }
}
exports.AccountCreateCommand = AccountCreateCommand
AccountCreateCommand['_translator'] = new common_1.ModelAutoMapper(AccountCreateCommand)
/**
 * Request DTO for account creating endpoint
 */
class AccountCreateResult extends ResultDTOBase {
    constructor() {
        super(...arguments)
        this.id = undefined
    }
}
exports.AccountCreateResult = AccountCreateResult
AccountCreateResult['_translator'] = new common_1.ModelAutoMapper(AccountCreateResult)
/**
 * Request DTO for account updating endpoint
 */
class AccountUpdateCommand extends AccountCreateCommand {
    constructor() {
        super(...arguments)
        this.id = undefined
    }
    /**
     * @override
     */
    static get objectSchema() {
        return schemaReplace
    }
}
exports.AccountUpdateCommand = AccountUpdateCommand
AccountUpdateCommand['_translator'] = new common_1.ModelAutoMapper(AccountUpdateCommand)
/**
 * Response DTO for account updating endpoint
 */
class AccountUpdateResult extends AccountCreateResult {
}
exports.AccountUpdateResult = AccountUpdateResult
AccountUpdateCommand['_translator'] = new common_1.ModelAutoMapper(AccountUpdateCommand)
/**
 * Response DTO for account detail endpoint
 */
class AccountDetailResult extends AccountCreateResult {
    constructor() {
        super(...arguments)
        this.id = undefined
        this.username = undefined
        this.role = undefined
        this.fullname = undefined
    }
}
exports.AccountDetailResult = AccountDetailResult
AccountDetailResult['_translator'] = new common_1.ModelAutoMapper(AccountDetailResult)
//# sourceMappingURL=account.model.js.map