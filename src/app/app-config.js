"use strict";

const f = require("fluture");

exports.getAppConfig = () => f.of({
    database: {
        connectionString: 'postgres://postgres:postgres@localhost:5432/gigaticket_local',
    },
    auth: {
        server: 'http://localhost',
        issuer: 'http://localhost',
        secret: 'S$3_?28Rvw-?S~y:-(tNb"SJYCzz,T',
    },
    crypto: {
        key: '^br,P2+gw56]b4hWSx4$Y2Q2ccY{e',
        algo: 'aes256',
        plainText: 'plaintext',
        randIdx: {
            min: 7,
            max: 17,
        },
    },
});
