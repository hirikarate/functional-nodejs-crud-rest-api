const fs = require('fs')
const path = require('path')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)


exports.up = async function(knex, Promise) {
    const schema = knex.schema

    console.log('** Dropping tables **')
    await Promise.all([
        schema.dropTableIfExists('fn_accounts'),
        schema.dropTableIfExists('fn_roles'),
        schema.dropTableIfExists('fn_account_role'),
    ])

    const sql = await readFileAsync(path.resolve(__dirname, '../sql/functions.pgsql'), 'utf8')
    console.log('** Executing custom SQL **')
    await schema.raw(sql)

    console.log('** Creating tables **')
    await accounts()
    await roles()
    await accountRole()

    /**
     * () => Promise
     */
    function accounts() {
        return schema.createTable('fn_accounts', tbl => {
            tbl.bigInteger('id').primary().defaultTo(knex.raw("public.next_id('fn_accounts')"))
            tbl.string('username', 100).notNullable().unique()
            tbl.string('password', 200).notNullable()
            tbl.string('fullname', 100)
        })
    }

    /**
     * () => Promise
     */
    function roles() {
        return schema.createTable('fn_roles', tbl => {
            tbl.bigInteger('id').primary().defaultTo(knex.raw("public.next_id('fn_roles')"))
            tbl.string('name', 50).notNullable().unique()
            tbl.string('description', 500)
        })
    }

    /**
     * () => Promise
     */
    function accountRole() {
        return schema.createTable('fn_account_role', tbl => {
            tbl.bigInteger('account_id').nullable().references('id').inTable('fn_accounts')
            tbl.bigInteger('role_id').nullable().references('id').inTable('fn_roles')
            tbl.primary(['account_id', 'role_id'])
        })
    }

}

exports.down = function(knex, Promise) {
}
