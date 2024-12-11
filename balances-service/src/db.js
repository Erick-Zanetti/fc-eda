import pg from 'pg';
const { Pool } = pg;

export const db = new Pool({
  host: 'postgres',
  user: 'user',
  password: 'password',
  database: 'balances',
  port: 5432,
});
