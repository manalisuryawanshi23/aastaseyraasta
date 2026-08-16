import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let isConnected = false;

export function getDbPool(): mysql.Pool | null {
  if (pool) return pool;

  const dbHost = process.env.DB_HOST || 'localhost';
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  // If DB credentials are not set, return null (triggers initialData.ts fallback)
  if (!dbUser || !dbName) {
    return null;
  }

  try {
    pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
    });
    return pool;
  } catch (error) {
    console.warn('[MYSQL INIT WARNING] Could not initialize MySQL pool:', error);
    return null;
  }
}

export async function testConnection(): Promise<boolean> {
  const p = getDbPool();
  if (!p) {
    isConnected = false;
    return false;
  }

  try {
    const connection = await p.getConnection();
    await connection.ping();
    connection.release();
    isConnected = true;
    return true;
  } catch (err) {
    console.warn('[MYSQL CONNECT WARNING] MySQL connection test failed:', err);
    isConnected = false;
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const p = getDbPool();
  if (!p) throw new Error('MySQL pool is not configured');
  const [rows] = await p.query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
  const p = getDbPool();
  if (!p) throw new Error('MySQL pool is not configured');
  const [result] = await p.execute(sql, params);
  return result as mysql.ResultSetHeader;
}
