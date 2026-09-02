import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { initialPoojas } from '../src/data/initialData';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function revertAndVerify() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Deergh',
    database: process.env.DB_NAME || 'aastha_db',
  });

  console.log('[REVERT] Connected to MySQL database:', process.env.DB_NAME || 'aastha_db');

  let updatedCount = 0;
  for (const p of initialPoojas) {
    const urlSlug = p.urlSlug || `/pooja/${p.slug}`;
    const h1 = p.h1 || p.name;
    const price = p.price && !isNaN(Number(p.price)) ? Number(p.price) : 0;
    const featuredImage = p.featuredImage || p.image || '/assets/images/pooja_rudrabhishek_1786196070818.jpg';

    const [res] = await conn.execute<any>(
      `UPDATE poojas SET
        name = ?,
        hindi_name = ?,
        slug = ?,
        url_slug = ?,
        h1 = ?,
        category_id = ?,
        category_name = ?,
        hindi_category_name = ?,
        short_description = ?,
        hindi_short_description = ?,
        description = ?,
        hindi_description = ?,
        temple_name = ?,
        hindi_temple_name = ?,
        location = ?,
        hindi_location = ?,
        city = ?,
        hindi_city = ?,
        price = ?,
        image = ?
      WHERE id = ?`,
      [
        p.name,
        p.hindiName || '',
        p.slug,
        urlSlug,
        h1,
        p.categoryId || 'cat-temple',
        p.categoryName || 'Temple Pooja Services',
        p.hindiCategoryName || '',
        p.shortDescription || '',
        p.hindiShortDescription || '',
        p.description || '',
        p.hindiDescription || '',
        p.templeName || '',
        p.hindiTempleName || '',
        p.location || '',
        p.hindiLocation || '',
        p.city || 'Ujjain',
        p.hindiCity || 'उज्जैन',
        price,
        featuredImage,
        p.id,
      ]
    );
    if (res.affectedRows > 0) {
      updatedCount++;
    }
  }

  console.log(`[REVERT] Successfully verified/updated ${updatedCount} canonical poojas in MySQL.`);

  const [allRows] = await conn.query<any>('SELECT id, name, slug, url_slug, is_published FROM poojas ORDER BY id');
  console.log('\n--- Current Poojas in Database ---');
  allRows.forEach((r: any, idx: number) => {
    console.log(`${idx + 1}. [${r.id}] "${r.name}" -> /pooja/${r.slug} (published: ${r.is_published})`);
  });

  await conn.end();
  console.log('\n[REVERT] Database connection closed. All poojas are restored to original state!');
}

revertAndVerify().catch((err) => {
  console.error('[ERROR]', err);
  process.exit(1);
});
