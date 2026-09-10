# Aastha Sey Raasta Seva — Deployment & Operations Guide

This guide covers:
1. **Maintenance Mode** (Admin Control & 503 Status)
2. **Persistent Image Storage on Hostinger** (Preventing CI/CD Image Deletion)
3. **Database Migrations & Auto-Seed Protection**

---

## 1. Maintenance Mode (Site Availability Control)

### How It Works
- **Admin Toggle**: The SuperAdmin / Admin can activate or deactivate Maintenance Mode from the **Overview tab** in the Admin Dashboard (`/admin`).
- **HTTP 503 Page for Public Visitors**: When Maintenance Mode is active, all public HTTP requests receive a high-performance HTTP `503 Service Unavailable` response with an elegant, devotee-friendly spiritual landing page.
- **Uninterrupted Admin Access**: 
  - The entire Admin portal (`/admin`, `/admin/*`) remains 100% accessible.
  - All API routes (`/api/*`), data synchronization, and image upload endpoints remain functional.
  - Staff and administrators can continue managing content, adding poojas, blogs, and configurations safely.
- **Customizable Devotee Message**: The admin can enter a custom message (e.g. "Performing Mahashivratri temple schedule updates. Back shortly.") directly from the admin panel.
- **Instant Activation**: Toggle takes effect immediately via in-memory cache invalidation on the Node.js server.

---

## 2. Persistent Image Storage on Hostinger (Fixing Disappearing Images)

### Problem
When deploying via Git, CI/CD, or Hostinger auto-deploy, executing `git pull` or clean builds can overwrite or delete files stored inside the repository folder (`public/assets/images`).

### Solution
The server now supports an external, persistent upload path via the `UPLOAD_PATH` environment variable. By storing uploaded assets in a directory **outside the Git repository**, deployments will never touch or wipe devotee photos and temple banners.

### Step-by-Step Setup on Hostinger (VPS / SSH / cPanel)

#### Step 1: Create the External Persistent Directory
SSH into your Hostinger server and run:
```bash
# Create a dedicated directory outside the web application Git root
mkdir -p ~/persistent_uploads/images
chmod 755 ~/persistent_uploads/images
```

#### Step 2: Copy Existing Uploads (One-time migration)
If you already have images uploaded in your current deployment, copy them over:
```bash
cp -r ~/your-app-path/public/assets/images/* ~/persistent_uploads/images/
```

#### Step 3: Configure `.env` in Your App Root
Edit your production `.env` file on Hostinger:
```ini
# Add the absolute path to your persistent directory
UPLOAD_PATH=/home/u123456789/persistent_uploads/images
```
*(Replace `u123456789` with your actual Hostinger cPanel/SSH username, or run `pwd` inside `~/persistent_uploads/images` to get the exact path).*

#### Step 4: Restart the Application
Restart your Node.js process manager (e.g., PM2):
```bash
pm2 restart all
# or: pm2 restart aastaserasta
```

### How the Express Server Handles It
- **Uploads (`POST /api/upload`)**: Multer automatically writes new uploads directly into `UPLOAD_PATH`.
- **Serving (`GET /assets/images/*`)**: Express static middleware serves files directly from `UPLOAD_PATH`, ensuring that all existing URLs (`/assets/images/image_123.jpg`) continue to work seamlessly without changing client-side links.
- **Local Dev Fallback**: On local developer machines where `UPLOAD_PATH` is not set, it safely defaults to `public/assets/images`.

---

## 3. Database Auto-Seeding & Production Safety

### Protection Against Overwrites
The database auto-seeder (`src/db/autoSeed.ts`) includes schema migration detection:
- `is_maintenance_mode` and `maintenance_message` columns are automatically and safely added to existing `site_settings` tables via `ALTER TABLE` if they do not yet exist.
- Existing records are preserved.
- Set `DISABLE_AUTO_SEED=true` in production `.env` after initial setup to lock database tables against any auto-seed overwrites.
