import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let isConnected = false;
let lastDbError: string | null = null;

export function getDbConfigDetails() {
  const dbHost = process.env.DB_HOST || 'localhost';
  const effectiveHost = dbHost === 'localhost' ? '127.0.0.1' : dbHost;
  const dbUser = process.env.DB_USER || '';
  const dbName = process.env.DB_NAME || '';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  return {
    host: dbHost,
    effectiveHost,
    port: dbPort,
    userProvided: !!dbUser,
    userPrefix: dbUser ? `${dbUser.substring(0, 4)}...` : 'not_set',
    nameProvided: !!dbName,
    dbName: dbName || 'not_set',
    passwordProvided: !!process.env.DB_PASSWORD,
    connected: isConnected,
    lastError: lastDbError,
  };
}

export function getLastDbError(): string | null {
  return lastDbError;
}

export function getDbPool(): mysql.Pool | null {
  if (pool) return pool;

  const dbHost = process.env.DB_HOST || 'localhost';
  // On Hostinger Linux / Passenger, 'localhost' tries Unix sockets which fail in caged environments.
  // Using '127.0.0.1' forces TCP socket connection over port 3306.
  const effectiveHost = dbHost === 'localhost' ? '127.0.0.1' : dbHost;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  if (!dbUser || !dbName) {
    lastDbError = `Missing DB credentials: DB_USER=${dbUser ? 'set' : 'EMPTY'}, DB_NAME=${dbName ? 'set' : 'EMPTY'}`;
    return null;
  }

  try {
    pool = mysql.createPool({
      host: effectiveHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
      connectTimeout: 10000,
    });
    return pool;
  } catch (error: any) {
    lastDbError = error?.message || String(error);
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
    lastDbError = null;
    return true;
  } catch (err: any) {
    lastDbError = `MySQL Ping Error: ${err?.message || String(err)} (code: ${err?.code || 'UNKNOWN'})`;
    console.warn('[MYSQL CONNECT WARNING] MySQL connection test failed:', lastDbError);
    isConnected = false;
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const p = getDbPool();
  if (!p) throw new Error(lastDbError || 'MySQL pool is not configured');
  const [rows] = await p.query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
  const p = getDbPool();
  if (!p) throw new Error(lastDbError || 'MySQL pool is not configured');
  const [result] = await p.execute(sql, params);
  return result as mysql.ResultSetHeader;
}
