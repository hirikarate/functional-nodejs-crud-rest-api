"use strict";

const re = require("./repository");

exports.repoInsertTicket = re.repoInsert;

exports.repoQueryTickets = re.repoQuery;

exports.repoPatchTicket = re.dbPatch;

exports.repoUpdateTicket = re.repoUpdate;

exports.repoDeleteTicket = re.repoDelete;
