"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_helper_1 = require("../../utils/dependency/dependency-helper");
const authLogic = require("../../domain/auth.logic");
const auth_router_1 = require("../../auth/auth.router");
exports.registerAuthDeps = () => {
    dependency_helper_1.registerFunction({
        name: 'authenticate',
        func: authLogic.authenticate,
        filledParamsCount: 1,
    });
    dependency_helper_1.registerFunction({
        name: 'createAuthToken',
        func: authLogic.createAuthToken,
        filledParamsCount: 1,
    });
    dependency_helper_1.registerValue(authLogic.validateCredentials, 'validateCredentials');
    dependency_helper_1.registerFunction({
        name: 'createAuthRouter',
        func: auth_router_1.createAuthRouter,
    });
};
//# sourceMappingURL=auth-deps.js.map