"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_printout_entity_1 = require("../checkin/ticket-printout.entity");
const dependency_helper_1 = require("../utils/dependency/dependency-helper");
const ticket_entity_1 = require("../../models/entities/role.entity");
const ticketLogic = require("./ticket.logic");
const ticketRepo = require("../../data-access/ticket.repository");
const ticketModel = require("../../models/ticket.model");
const ticket_router_1 = require("../../web/ticket.router");
exports.registerTicketDeps = () => {
    dependency_helper_1.registerValue(ticket_entity_1.TicketEntity, 'TicketEntity');
    dependency_helper_1.registerValue(ticket_printout_entity_1.TicketPrintoutEntity, 'TicketPrintoutEntity');
    dependency_helper_1.registerFunction({
        name: 'repoInsertTicket',
        func: ticketRepo.re,
        filledParamsCount: 2,
        parameters: ['dbInsert', 'TicketEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoQueryTickets',
        func: ticketRepo.re,
        filledParamsCount: 2,
        parameters: ['dbSelect', 'TicketEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoUpdateTicket',
        func: ticketRepo.re,
        filledParamsCount: 2,
        parameters: ['dbUpdate', 'TicketEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoDeleteTicket',
        func: ticketRepo.re,
        filledParamsCount: 2,
        parameters: ['dbDelete', 'TicketEntity'],
    });
    // registerFunction({
    //     name: 'repoInsertTicketPrintout',
    //     func: ticketRepo.repoInsertTicketPrintout,
    //     filledParamsCount: 2,
    // })
    dependency_helper_1.registerValue(ticketModel.TicketCreateCommand, 'TicketCreateCommand');
    dependency_helper_1.registerValue(ticketModel.TicketCreateResult, 'TicketCreateResult');
    dependency_helper_1.registerValue(ticketModel.TicketUpdateCommand, 'TicketUpdateCommand');
    dependency_helper_1.registerValue(ticketModel.TicketUpdateResult, 'TicketUpdateResult');
    dependency_helper_1.registerValue(ticketModel.TicketDetailResult, 'TicketDetailResult');
    dependency_helper_1.registerFunction({
        name: 'logicCreateTicket',
        func: ticketLogic.logicCreateTicket,
        filledParamsCount: 2,
        parameters: ['repoInsertTicket', 'TicketCreateResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicUpdateTicket',
        func: ticketLogic.logicUpdateTicket,
        filledParamsCount: 2,
        parameters: ['repoUpdateTicket', 'TicketUpdateResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicFindTickets',
        func: ticketLogic.logicFindTickets,
        filledParamsCount: 2,
        parameters: ['repoQueryTickets', 'TicketDetailResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicFindOneTicket',
        func: ticketLogic.logicFindOneTicket,
        filledParamsCount: 2,
        parameters: ['repoQueryTickets', 'TicketDetailResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicFindTicketById',
        func: ticketLogic.logicFindTicketById,
        filledParamsCount: 2,
        parameters: ['repoQueryTickets', 'TicketDetailResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicDeleteTicket',
        func: ticketLogic.logicDeleteTicket,
        filledParamsCount: 1,
        parameters: ['repoDeleteTicket'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateCreateTicket',
        func: ticketLogic.logicValidateTicket,
        filledParamsCount: 1,
        parameters: ['TicketCreateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateUpdateTicket',
        func: ticketLogic.logicValidateTicket,
        filledParamsCount: 1,
        parameters: ['TicketUpdateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateTicketId',
        func: ticketLogic.logicValidateTicketId,
        filledParamsCount: 1,
        parameters: ['TicketUpdateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'createTicketRouter',
        func: ticket_router_1.createTicketRouter,
    });
};
//# sourceMappingURL=ticket.deps.js.map