'use strict'

const passport = require('passport')
const Knex = require('knex')
const { knexSnakeCaseMappers } = require('objection')
const { getAppConfig } = require('./app-config')
const { initWebServer } = require('./bootstrap/app-server')
const { initAccountRoute } = require('./bootstrap/app-factory')
const { EntityBase } = require('./models/entities/EntityBase')

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
    expr.use('/accounts', initAccountRoute())

    return expr
}

const initDatabase = () => {
    return getAppConfig()
        .map((appConfig) => {
            const knexConnection = Knex({
                client: 'pg',
                connection: appConfig.database.connectionString,
                ...knexSnakeCaseMappers()
            })
            EntityBase.knex(knexConnection)
        })
}

initDatabase()
    .map(initWebServer)
    .map(initApp)
    .fork(
        console.error,
        expr => expr.listen(3000, () => {
            console.log('Listening to port 3000')
        }))
