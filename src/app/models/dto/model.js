"use strict";

const Joi = require("joi");

exports.idRule = Joi.string().regex(/^[0-9]+$/).required()

const idSchema = Joi.object({
    id: exports.idRule,
})
exports.idSchema = idSchema

/**
 * Base class for request DTO
 */
class CommandDTOBase {
    /**
     * Translates an object to this class type.
     */
    static from(source) {
        if (!this['_translator']) {
            throw new Error('`this._translator` must be defined by derived class!');
        }
        return this['_translator'](source);
    }
    /**
     * Gets object schema used for validation
     */
    static get objectSchema() {
        throw new Error('This method must be implemented by derived class!');
    }
}
exports.CommandDTOBase = CommandDTOBase;


/**
 * Base class for response DTO
 */
class ResultDTOBase {
    /**
     * Translates an object to this class type.
     */
    static from(source) {
        if (!this['_translator']) {
            throw new Error('`this._translator` must be defined by derived class!');
        }
        return this['_translator'](source);
    }
}
exports.ResultDTOBase = ResultDTOBase;
