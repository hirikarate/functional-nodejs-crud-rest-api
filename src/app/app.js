"use strict"

const passport = require("passport")
const Knex = require("knex")
const { knexSnakeCaseMappers } = require("objection")
const { getAppConfig } = require("./app-config")
const { initWebServer } = require("./bootstrap/app-server")
const { registerDependencies } = require("./bootstrap/app-factory")
const { EntityBase } = require("./models/entities/EntityBase")
const { resolve } = require("./utils/dependency/dependency-helper")

/* Global events */
process
    .on('unhandledRejection', error => {
    console.error(`unhandledRejection: ${error.stack}`)
    process.exit(1)
})
    .on('uncaughtException', error => {
    console.error(`uncaughtException: ${error.stack}`)
    process.exit(1)
})

/* Setup web server */
const throwError = (path) => () => { 
    throw Error(`Failed to init path ${path}`)
}
const initApp = (expr) => {
    const passportMiddleware = passport.authenticate('jwt', { session: false })
    resolve('createAuthRouter')
        .map(createAuthRouter => expr.use('/auth', createAuthRouter()))
        .orElse(throwError('/auth'))
    resolve('createAccountRouter')
        // .map(fn => expr.use('/accounts', passportMiddleware, fn()))
        .map(createAccountRouter => expr.use('/accounts', createAccountRouter()))
        .orElse(throwError('/orders'))
    resolve('createTicketRouter')
        // .map(fn => expr.use('/tickets', passportMiddleware, fn()))
        .map(createTicketRouter => expr.use('/tickets', createTicketRouter()))
        .orElse(throwError('/tickets'))
    resolve('createCheckinRouter')
        // .map(fn => expr.use('/tickets', passportMiddleware, fn()))
        .map(createCheckinRouter => expr.use('/checkin', createCheckinRouter()))
        .orElse(throwError('/tickets'))
    return expr
}

const initDatabase = (server) => {
    return getAppConfig()
        .map((appConfig) => {
            const knexConnection = Knex({
                client: 'pg',
                connection: appConfig.database.connectionString,
                ...knexSnakeCaseMappers()
            })
            EntityBase.knex(knexConnection)
            return server
        })
}

registerDependencies()
    .chain(initWebServer)
    .chain(initDatabase)
    .map(initApp)
    .fork(
        console.error,
        expr => expr.listen(3000, () => {
            console.log('Listening to port 3000')
        }))
