
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			database: 'func-node',
			user: 'postgres',
			password: 'postgres'
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
