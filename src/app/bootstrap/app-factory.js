"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("../app-config");
const dbOps = require("../data-access/pg-operators");
const orderLogic = require("../ticket-order/ticket-order.logic");
const ticket_order_router_1 = require("../ticket-order/ticket-order.router");
// import { getOrderDAO } from './order/ticket-order.model'
// import { getOrderTicketDetailDAO } from './order/ticket-order.model'
// import { getOrderComboDetailDAO } from './order/order-combo.dao'
const dependency_helper_1 = require("../utils/dependency/dependency-helper");
const ticket_router_1 = require("../web/ticket.router");
const account_deps_1 = require("./deps/account.deps");
const ticket_deps_1 = require("./deps/ticket.deps");
const auth_deps_1 = require("./deps/auth-deps");
const checkin_deps_1 = require("../checkin/checkin.deps");

const dbConn = dbGetConnection(config.database.connectionString)

const accountDAO = getAccountDAO(dbConn)
const accountRepo = createAccountRepository(accountDAO, dbOperators)
const accountRouter = createAccountRouter(accountRepo)

const authLogic = createAuthLogic(config.auth, accountRepo)
const authRouter = createAuthRouter(config.auth, authLogic, console)

const orderDAO = getOrderDAO(dbConn)
const orderRepo = createOrderRepository(orderDAO, dbOperators)
const orderLogic = createOrderLogic(orderRepo)
const orderRouter = createOrderRouter(orderLogic, console)


module.exports = {
    accountRepo,
    accountRouter,
    authLogic,
    authRouter,
    orderLogic,
    orderRouter,
    orderRepo,
}
