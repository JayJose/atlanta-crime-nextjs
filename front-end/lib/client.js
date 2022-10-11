export function createClient() {
  const { Client } = require('pg');
  const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'crime',
    password: 'admin',
    port: 5432
  });
  return client;
}
