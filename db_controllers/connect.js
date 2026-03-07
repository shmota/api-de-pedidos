import { Pool } from 'pg';
import 'dotenv/config';

export default async function connect() {
  if (global.connection)
    return global.connection.connect();

  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });

  const client = await pool.connect();
  console.log("Conexão estabelecida com sucesso!");
  client.release();

  global.connection = pool;
  return pool.connect();
}