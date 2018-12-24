'use strict'

const { Model } = require('objection')


/**
 * @abstract Base class for db entity classes.
 */
class EntityBase extends Model {
    /**
     * [ObjectionJS] Database table name
     * 
     * () => string
     * 
     * @abstract
     */
    static get tableName() {
        throw new Error('This method must be implemented by derived class!')
    }
}

module.exports = { EntityBase }
