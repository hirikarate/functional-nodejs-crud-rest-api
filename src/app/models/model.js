"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const idSchema = Joi.string().regex(/^[0-9]+$/).required();
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
        return this['_translator'].whole(source);
    }
    /**
     * Gets object schema used for validation
     */
    static get objectSchema() {
        throw new Error('This method must be implemented by derived class!');
    }
    /**
     * Gets id schema used for validation
     */
    static get idSchema() {
        return idSchema;
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
        return this['_translator'].whole(source);
    }
}
exports.ResultDTOBase = ResultDTOBase;
//# sourceMappingURL=model.js.map