import { Pool } from 'pg';
import 'dotenv/config';

/**
 * @description Cria e retorna um pool de conexões com o banco de dados PostgreSQL.
 * Mantém uma única instância de pool para reutilização.
 * @returns {Pool} Pool de conexões do PostgreSQL
 */
let pool;

export default function connect() {

  // Se o pool ainda não foi criado, cria uma nova instância
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.CONNECTION_STRING, // String de conexão do .env
      max: 20,                                         // Número máximo de conexões simultâneas
      idleTimeoutMillis: 30000                         // Tempo máximo em ms que uma conexão pode ficar ociosa
    });

    // Log indicando que o pool foi criado
    console.log("Pool de conexões criado");
  }

  // Retorna o pool existente ou recém-criado
  return pool;
}