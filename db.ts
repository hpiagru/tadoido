
/**
 * Para utilizar este arquivo, instale a dependência: npm install pg
 * E configure as variáveis de ambiente no seu servidor/host.
 */

import { Pool } from 'pg';

// Configuração do Pool de conexão usando variáveis de ambiente
// Essas variáveis são injetadas automaticamente por provedores como Vercel, Railway ou Supabase
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: false // Necessário para a maioria dos serviços de DB em nuvem
  }
});

export const db = {
  /**
   * Executa uma query no banco de dados.
   * @param text A string da query SQL
   * @param params Parâmetros para evitar SQL Injection
   */
  query: (text: string, params?: any[]) => pool.query(text, params),
  
  /**
   * Abre uma conexão para transações complexas
   */
  getClient: () => pool.connect(),
};

export default db;
