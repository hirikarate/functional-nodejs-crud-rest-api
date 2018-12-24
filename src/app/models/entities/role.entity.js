'use strict'

const EntityBase = require('./EntityBase')

const DB_TABLE = 'public.fn_roles'

exports.RoleEntity = class extends EntityBase {
    /**
     * @override
     */
    static get tableName() {
        return DB_TABLE
    }

    constructor() {
        super()
        this.id = undefined
        this.name = undefined
        this.description = undefined
    }
}
exports.TicketEntity = TicketEntity
