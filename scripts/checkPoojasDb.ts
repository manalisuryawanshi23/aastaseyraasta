import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const dbHost = process.env.DB_HOST || '127.0.0.1';
  const effectiveHost = dbHost === 'localhost' ? '127.0.0.1' : dbHost;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

  if (!dbUser || !dbName) {
    console.log('No DB credentials configured in .env');
    return;
  }

  try {
    const conn = await mysql.createConnection({
      host: effectiveHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
    });
    console.log('Successfully connected to MySQL database:', dbName);

    const [rows]: any = await conn.query('SELECT id, slug, name, url_slug, is_published FROM poojas ORDER BY id');
    console.log(`Found ${rows.length} poojas in database:`);
    for (const r of rows) {
      console.log(` - ID: "${r.id}", Slug: "${r.slug}", Name: "${r.name}", URL: "${r.url_slug}"`);
    }

    const [chk]: any = await conn.query('SELECT id, slug, name FROM poojas WHERE slug LIKE "%guru-chandal%" OR id LIKE "%guru-chandal%"');
    console.log('\nSearch for guru-chandal records:', chk);

    await conn.end();
  } catch (err: any) {
    console.error('MySQL Error:', err.message);
  }
}

main();
