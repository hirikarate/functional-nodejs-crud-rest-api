"use strict";

const express = require("express");
const FL = require("fluture");

exports.initWebServer = () => FL.Future((reject, resolve) => {
    const server = express();
    server.on('error', console.error);

    // parse application/x-www-form-urlencoded
    server.use(express.urlencoded({ extended: false }));
    // parse application/json
    server.use(express.json());
    server.all('/', (_, res) => res.send('Welcome to Functional RESTful CRUD service'));
    resolve(server);
});
