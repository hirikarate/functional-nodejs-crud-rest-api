"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const FL = require("fluture");
const R = require("ramda");
const wo = require("../utils/web-operators");
exports.createTicketRouter = ((logicCreateTicket, logicFindTickets, logicFindTicketById, logicUpdateTicket, logicDeleteTicket, logicValidateCreateTicket, logicValidateUpdateTicket, logicValidateTicketId, logger) => {
    const router = express.Router();
    const execGetQuery = wo.execGetQuery(logger);
    const execCommand = wo.execCommand(logger);
    const execCreateCommand = wo.execCreateCommand(logger);
    /**
     * GET /tickets
     * Gets all tickets
     */
    router.get('/', (req, res) => R.pipe(logicFindTickets, execGetQuery(res))(null));
    /**
     * GET /tickets/:id
     * Get a ticket by id
     */
    router.get('/:id', (req, res) => R.pipe(logicFindTicketById, execGetQuery(res))(req.params.id));
    /**
     * POST /tickets
     * Creates new ticket
     */
    router.post('/', (req, res) => R.pipe(wo.validateTask(logicValidateCreateTicket, logicCreateTicket), execCreateCommand(res))(FL.of(req.body)));
    /**
     * PUT /tickets
     * Replaces an existing ticket
     */
    router.put('/', (req, res) => R.pipe(wo.validateTask(logicValidateUpdateTicket, logicUpdateTicket), execCommand(res, null))(FL.of(req.body)));
    /**
     * DELETE /tickets/:id
     * Permanently deletes a ticket
     */
    router.delete('/:id', (req, res) => R.pipe(wo.validateTask(logicValidateTicketId, logicDeleteTicket), execCommand(res, null))(FL.of(req.params.id)));
    return router;
});
//# sourceMappingURL=ticket.router.js.map