"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const FL = require("fluture");
const R = require("rambda");
const wo = require("../utils/web-operators");
exports.createAccountRouter = ((logicCreateAccount, logicFindAccounts, logicUpdateAccount, logicDeleteAccount, logicValidateCreateAccount, logicValidateUpdateAccount, logicValidateAccountId, logger) => {
    const router = express.Router();
    const execGetQuery = wo.execGetQuery(logger);
    const execCommand = wo.execCommand(logger);
    const execCreateCommand = wo.execCreateCommand(logger);
    /**
     * GET /accounts
     * Gets all accounts
     */
    router.get('/', (req, res) => R.pipe(logicFindAccounts, execGetQuery(res))(null));
    /**
     * POST /accounts
     * Creates new account
     */
    router.post('/', (req, res) => R.pipe(wo.validateTask(logicValidateCreateAccount, logicCreateAccount), execCreateCommand(res))(FL.of(req.body)));
    /**
     * PUT /accounts
     * Replaces an existing account
     */
    router.put('/', (req, res) => R.pipe(wo.validateTask(logicValidateUpdateAccount, logicUpdateAccount), execCommand(res, null))(FL.of(req.body)));
    /**
     * DELETE /accounts/:id
     * Permanently deletes an account
     */
    router.delete('/:id', (req, res) => R.pipe(wo.validateTask(logicValidateAccountId, logicDeleteAccount), execCommand(res, null))(FL.of(req.params.id)));
    return router;
});
//# sourceMappingURL=account.router.js.map