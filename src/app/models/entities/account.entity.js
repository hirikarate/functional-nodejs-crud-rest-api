"use strict";

const { Model } = require('objection')

const { EntityBase } = require("./EntityBase");

const DB_TABLE = 'public.fn_accounts';
const JOINT_TABLE = 'public.fn_account_role';


class AccountEntity extends EntityBase {

    /**
     * @override
     */
    static get tableName() {
        return DB_TABLE;
    }

    /**
     * [ObjectionJS]
     */
    static get relationMappings() {
        // Lazy reference to avoid circular reference.
        // `relationMappings()` is called only once when creating a connection.
        const { RoleEntity } = require('./role.entity')
        return {
            privilege: {
                relation: Model.ManyToManyRelation,
                modelClass: RoleEntity,
                join: {
                    from: `${this.tableName}.id`,
                    through: {
                        from: `${JOINT_TABLE}.account_id`,
                        to: `${JOINT_TABLE}.role_id`,
                    },
                    to: `${RoleEntity.tableName}.id`,
                },
            },
        }
    }

    constructor() {
        super();

        // Pre-create properties to facilitate V8 hidden class optimization.
        this.id = undefined;
        this.username = undefined;
        this.password = undefined;
        this.fullname = undefined;
    }
}

module.exports = { AccountEntity }
