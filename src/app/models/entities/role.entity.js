'use strict'

const { EntityBase } = require('./EntityBase')

const DB_TABLE = 'public.fn_roles'
const JOINT_TABLE = 'public.fn_account_role';


class RoleEntity extends EntityBase {
    /**
     * @override
     */
    static get tableName() {
        return DB_TABLE
    }

    /**
     * [ObjectionJS]
     */
    static get relationMappings() {
        // Lazy reference to avoid circular reference.
        // `relationMappings()` is called only once when creating a connection.
        const { AccountEntity } = require('./account.entity')
        return {
            assignedTo: {
                relation: Model.ManyToManyRelation,
                modelClass: AccountEntity,
                join: {
                    from: `${this.tableName}.id`,
                    through: {
                        from: `${JOINT_TABLE}.role_id`,
                        to: `${JOINT_TABLE}.account_id`,
                    },
                    to: `${AccountEntity.tableName}.id`,
                },
            },
        }
    }

    constructor() {
        super()

        // Pre-create properties to facilitate V8 hidden class optimization.
        this.id = undefined
        this.name = undefined
        this.description = undefined
    }
}

module.exports = { RoleEntity }
