"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_helper_1 = require("../utils/dependency/dependency-helper");
const account_entity_1 = require("../../models/entities/account.entity");
const accRepo = require("../../data-access/account.repository");
const accModel = require("../../models/dto/account.model");
const accLogic = require("../../domain/account.logic");
const account_router_1 = require("../../web/account.router");
exports.registerAccountDeps = () => {
    dependency_helper_1.registerValue(account_entity_1.AccountEntity, 'AccountEntity');
    dependency_helper_1.registerFunction({
        name: 'repoInsertAccount',
        func: accRepo.re,
        filledParamsCount: 2,
        parameters: ['dbInsert', 'AccountEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoQueryAccounts',
        func: accRepo.re,
        filledParamsCount: 2,
        parameters: ['dbSelect', 'AccountEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoUpdateAccount',
        func: accRepo.re,
        filledParamsCount: 2,
        parameters: ['dbUpdate', 'AccountEntity'],
    });
    dependency_helper_1.registerFunction({
        name: 'repoDeleteAccount',
        func: accRepo.re,
        filledParamsCount: 2,
        parameters: ['dbDelete', 'AccountEntity'],
    });
    dependency_helper_1.registerValue(accModel.AccountCreateCommand, 'AccountCreateCommand');
    dependency_helper_1.registerValue(accModel.AccountCreateResult, 'AccountCreateResult');
    dependency_helper_1.registerValue(accModel.AccountUpdateCommand, 'AccountUpdateCommand');
    dependency_helper_1.registerValue(accModel.AccountUpdateResult, 'AccountUpdateResult');
    dependency_helper_1.registerValue(accModel.AccountDetailResult, 'AccountDetailResult');
    dependency_helper_1.registerFunction({
        name: 'logicCreateAccount',
        func: accLogic.lg,
        filledParamsCount: 2,
        parameters: ['repoInsertAccount', 'AccountCreateResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicUpdateAccount',
        func: accLogic.lg,
        filledParamsCount: 2,
        parameters: ['repoUpdateAccount', 'AccountUpdateResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicFindAccounts',
        func: accLogic.logicFindAccounts,
        filledParamsCount: 2,
        parameters: ['repoQueryAccounts', 'AccountDetailResult'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicDeleteAccount',
        func: accLogic.lg,
        filledParamsCount: 1,
        parameters: ['repoDeleteAccount'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateCreateAccount',
        func: accLogic.lg,
        filledParamsCount: 1,
        parameters: ['AccountCreateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateUpdateAccount',
        func: accLogic.lg,
        filledParamsCount: 1,
        parameters: ['AccountUpdateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'logicValidateAccountId',
        func: accLogic.lg,
        filledParamsCount: 1,
        parameters: ['AccountUpdateCommand'],
    });
    dependency_helper_1.registerFunction({
        name: 'createAccountRouter',
        func: account_router_1.createAccountRouter,
    });
};
//# sourceMappingURL=account.deps.js.map