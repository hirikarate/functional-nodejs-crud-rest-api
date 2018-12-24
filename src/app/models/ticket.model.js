"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const common_1 = require("@micro-fleet/common");
const model_1 = require("./model");
const schemaCreate = Joi.object().keys({
    name: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(50).required(),
    description: Joi.string().min(1).max(500),
    codePrefix: Joi.string().min(1).max(5),
    price: Joi.number().required(),
    isEnabled: Joi.boolean().default(false),
    priceSettingsId: Joi.string().regex(/^[0-9]+$/),
});
const schemaReplace = schemaCreate.keys({
    id: Joi.string().regex(/^[0-9]+$/).required(),
    name: Joi.string().regex(/[a-zA-Z0-9_\.]/).min(1).max(50).optional(),
    price: Joi.number().optional(),
});
/**
 * Request DTO for ticket creating endpoint
 */
class TicketCreateCommand extends model_1.CommandDTOBase {
    constructor() {
        super(...arguments);
        this.name = undefined;
        this.description = undefined;
        this.codePrefix = undefined;
        this.price = undefined;
        this.isEnabled = undefined;
        this.priceSettingsId = undefined;
    }
    /**
     * @override
     */
    static get objectSchema() {
        return schemaCreate;
    }
}
exports.TicketCreateCommand = TicketCreateCommand;
TicketCreateCommand['_translator'] = new common_1.ModelAutoMapper(TicketCreateCommand);
/**
 * Request DTO for ticket creating endpoint
 */
class TicketCreateResult extends model_1.ResultDTOBase {
    constructor() {
        super(...arguments);
        this.id = undefined;
    }
}
exports.TicketCreateResult = TicketCreateResult;
TicketCreateResult['_translator'] = new common_1.ModelAutoMapper(TicketCreateResult);
/**
 * Request DTO for ticket updating endpoint
 */
class TicketUpdateCommand extends TicketCreateCommand {
    constructor() {
        super(...arguments);
        this.id = undefined;
    }
    /**
     * @override
     */
    static get objectSchema() {
        return schemaReplace;
    }
}
exports.TicketUpdateCommand = TicketUpdateCommand;
TicketUpdateCommand['_translator'] = new common_1.ModelAutoMapper(TicketUpdateCommand);
/**
 * Response DTO for ticket updating endpoint
 */
class TicketUpdateResult extends TicketCreateResult {
}
exports.TicketUpdateResult = TicketUpdateResult;
TicketUpdateCommand['_translator'] = new common_1.ModelAutoMapper(TicketUpdateCommand);
/**
 * Response DTO for ticket detail endpoint
 */
class TicketDetailResult extends model_1.ResultDTOBase {
    constructor() {
        super(...arguments);
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.codePrefix = undefined;
        this.price = undefined;
        this.isEnabled = undefined;
    }
}
exports.TicketDetailResult = TicketDetailResult;
TicketDetailResult['_translator'] = new common_1.ModelAutoMapper(TicketDetailResult);
//# sourceMappingURL=ticket.model.js.map