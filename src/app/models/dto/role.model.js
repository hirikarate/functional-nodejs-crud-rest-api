'use strict'

const Joi = require('joi')
const { CommandDTOBase, ResultDTOBase } = require('./model')
const { createTranslator } = require('../../utils/model-translator')


const schemaCreate = Joi.object().keys({
    name: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(50).required(),
    description: Joi.string().min(1).max(500).optional(),
})

const schemaPatch = Joi.object().keys({
    name: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(50).optional(),
    description: Joi.string().min(1).max(500).optional(),
})

const schemaReplace = schemaCreate.keys({
    id: Joi.string().regex(/^[0-9]+$/).required(),
})

/**
 * Request DTO for role creating endpoint
 */
class RoleCreateCommand extends CommandDTOBase {
    /**
     * @override
     */
    static get objectSchema() {
        return schemaCreate
    }

    constructor() {
        super()
        this.name = undefined
        this.description = undefined
    }
}
RoleCreateCommand['_translator'] = createTranslator(RoleCreateCommand)
exports.RoleCreateCommand = RoleCreateCommand


/**
 * Request DTO for role creating endpoint
 */
class RoleCreateResult extends ResultDTOBase {
    constructor() {
        super()
        this.id = undefined
    }
}
RoleCreateResult['_translator'] = createTranslator(RoleCreateResult)
exports.RoleCreateResult = RoleCreateResult


/**
 * Request DTO for role updating endpoint
 */
class RoleUpdateCommand extends RoleCreateCommand {
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
RoleUpdateCommand['_translator'] = createTranslator(RoleUpdateCommand)
exports.RoleUpdateCommand = RoleUpdateCommand


/**
 * Response DTO for role updating endpoint
 */
class RoleUpdateResult extends RoleCreateResult {
}
RoleUpdateCommand['_translator'] = createTranslator(RoleUpdateCommand)
exports.RoleUpdateResult = RoleUpdateResult


/**
 * Request DTO for role patching endpoint
 */
class RolePatchCommand extends RoleUpdateCommand {
    /**
     * @override
     */
    static get objectSchema() {
        return schemaPatch
    }

    constructor() {
        super()
        this.id = undefined
    }
}
RolePatchCommand['_translator'] = createTranslator(RolePatchCommand)
exports.RolePatchCommand = RolePatchCommand


/**
 * Response DTO for role patching endpoint
 */
class RolePatchResult extends RoleUpdateResult {
}
RolePatchResult['_translator'] = createTranslator(RolePatchResult)
exports.RolePatchResult = RolePatchResult


/**
 * Response DTO for role detail endpoint
 */
class RoleDetailResult extends ResultDTOBase {
    constructor() {
        super()
        this.id = undefined
        this.name = undefined
        this.description = undefined
    }
}
exports.RoleDetailResult = RoleDetailResult
RoleDetailResult['_translator'] = createTranslator(RoleDetailResult)
