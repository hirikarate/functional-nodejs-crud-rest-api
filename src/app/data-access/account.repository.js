"use strict";

const re = require("./repository");

exports.repoInsertAccount = re.repoInsert;

exports.repoQueryAccounts = re.repoQuery;

exports.repoPatchAccount = re.dbPatch;

exports.repoUpdateAccount = re.repoUpdate;

exports.repoDeleteAccount = re.repoDelete;
