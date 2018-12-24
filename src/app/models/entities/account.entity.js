"use strict";

const { Model } = require('objection')

const { EntityBase } = require("./EntityBase");

const DB_TABLE = 'public.fn_accounts';

exports.AccountEntity = class extends EntityBase {

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
                relation: Model.HasOneRelation,
                modelClass: SettingEntity,
                join: {
                    from: `${this.tableName}.role_id`,
                    to: `${SettingEntity.tableName}.id`,
                },
            },
        }
    }

    constructor() {
        super();

        this.id = undefined;
        this.username = undefined;
        this.password = undefined;
        this.role = undefined;
        this.fullname = undefined;
    }
}
