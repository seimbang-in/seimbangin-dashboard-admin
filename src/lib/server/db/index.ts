import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '$env/static/private';

// database configuration
const host = DB_HOST;
const user = DB_USER;
const password = DB_PASSWORD;
const database = DB_NAME;

// create a connection pool
export const poolConnection = mysql.createPool({
	host: host || '',
	user: user || '',
	password: password || '',
	database: database || '',
	multipleStatements: true,
	ssl: {
		rejectUnauthorized: false
	}
});

// create a drizzle instance
const db = drizzle(poolConnection, { schema, mode: 'default' });

export default db;
