# Salam OSM ENV Navigator

Salam OSM ENV Navigator is a centralized internal environment directory for managing and sharing COM/SOM environment details in one place. It is designed for teams who need quick access to environment URLs, host entries, database details, SSH information, and reusable log-access BAT files without repeatedly searching through spreadsheets or chat messages.

This project now includes environment management, multi-log BAT downloads, recent-update visibility, and a protected access model with admin approval so the application can be hosted more safely.

---

## What this application does

The application helps a team:

- view all environments in one place
- group environments by PROD / UAT / SIT / ST / DEV / MIG
- search and filter environments quickly
- store COM and SOM specific data separately
- save host entries, DB info, machine details, and other notes
- download BAT files for COM/SOM log commands
- support multiple log downloads from one field
- visibly highlight recently updated environments
- restrict access using login + admin approval

---

## Main features

### 1. Environment catalog
Each environment can store:

- Environment Name
- Dev Name / Alias
- Group Name
- Notes
- COM and SOM WebLogic URLs
- COM and SOM Order Management URLs
- COM and SOM Orchestration URLs
- Host file entries
- SSH details
- COM and SOM DB information
- Other environment-specific information

### 2. Group-based navigation
The UI supports grouped browsing for:

- PROD
- UAT
- SIT
- ST
- DEV
- MIG

This makes it easier to quickly focus on the correct set of environments.

### 3. Search and quick filtering
Users can:

- search by name, dev name, or notes
- filter by environment group
- use keyboard shortcut style workflow for quicker navigation

### 4. COM / SOM split layout
Each environment card clearly separates COM and SOM details so team members can compare or use the correct side quickly.

### 5. Copy-friendly details
Important values such as URLs and host entries can be copied directly from the UI.

### 6. BAT log download generation
The app supports downloading BAT files for COM and SOM logs.

Behavior implemented:

- the exact stored log command is written into the downloaded `.bat` file
- if multiple log commands are stored in one field, multiple BAT files are downloaded
- inline or line-based separators are supported

#### Supported log separators
If you want multiple log BAT files to be downloaded from one COM/SOM field, separate commands using one of these patterns:

- `---`
- `===`
- `|||`

Examples:

```text
start cmd /k "...ms1..."
---
start cmd /k "...ms2..."
```

or

```text
start cmd /k "...ms1..." --- start cmd /k "...ms2..."
```

### 7. Recent update warning
If an environment was updated within the last 7 days, the card shows a visible warning badge so team members can immediately notice recent changes.

### 8. Theme support
The application supports dark and light themes.

### 9. Admin-controlled access
The app includes a simple application-level authentication model.

Rules:

- users must log in before seeing environment data
- new users cannot access environments until approved by an admin
- admin users can approve or reject other users

### 10. Password management
Approved logged-in users can change their password from a dedicated Change Password section.

### 11. Discoverable navigation for protected features
Once logged in, users see separate navigation buttons for:

- Environments
- Admin Access (admins only)
- Change Password

---

## Admin access flow

### First user
The very first registered user becomes:

- `role = admin`
- `status = approved`

This user can log in immediately and manage other users.

### Other users
All later users are created as:

- `role = user`
- `status = pending`

They must wait until an admin approves them.

### How admin approval works
After logging in as admin:

1. open the app
2. click **Admin Access**
3. review registered users
4. approve or reject them

Only approved users can access the environment APIs and UI.

---

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend (local):** Express via `server.js`
- **Backend (deployment):** Vercel Serverless Functions
- **Database:** Supabase
- **Authentication model:** custom app-level auth stored in Supabase tables

---

## Project structure

```text
api/
  auth/
    register.js
    login.js
    me.js
    users.js
    change-password.js
  environments/
    index.js
    [id].js
    [id]/index.js
  seed.js

lib/
  db.js
  auth.js

public/
  index.html

server.js
supabase.sql
supabase_auth_setup.sql
vercel.json
```

---

## Database setup

There are **two SQL setup files**.

### 1. Main environment schema
Run:

- `supabase.sql`

This creates the `environments` table and related environment fields.

### 2. Authentication schema
Run:

- `supabase_auth_setup.sql`

This creates:

- `app_users`
- `app_sessions`

These are required for login, session handling, and admin approval.

---

## Local setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file with:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_or_server_key
```

### 3. Run SQL in Supabase
Run both files in the Supabase SQL editor:

- `supabase.sql`
- `supabase_auth_setup.sql`

### 4. Start locally
```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

---

## Seeding data

To load the seed data:

```bash
curl -X POST http://localhost:3000/api/seed
```

On production:

```bash
curl -X POST https://your-vercel-app.vercel.app/api/seed
```

---

## Vercel deployment notes

### Recommended Vercel setup

- Framework preset: `Other`
- Root directory: `./`
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty

### Required environment variables on Vercel

- `SUPABASE_URL`
- `SUPABASE_KEY`

### Important Vercel routing note
This project uses explicit rewrites in `vercel.json` so that dynamic API routes and auth routes resolve correctly in production.

If login/register fails in Vercel with HTML/404 instead of JSON, confirm your latest `vercel.json` is deployed.

---

## Security notes

This app is intended for internal controlled access, but keep these points in mind:

- rotate secrets if they were ever committed accidentally
- never push `.env`
- use `.gitignore` to exclude secrets and generated files
- keep Supabase keys secure
- admin approval reduces exposure, but sensitive credentials inside the environment records should still be treated carefully

---

## Usage guide

### Register first admin
1. open the app
2. click **Register**
3. create the first account
4. that account becomes approved admin automatically

### Login
1. open the app
2. click **Login**
3. use approved credentials

### Approve users
1. login as admin
2. click **Admin Access**
3. approve or reject pending users

### Change password
1. login
2. click **Change Password**
3. enter current password and new password

### Edit environments
1. login as approved user
2. browse to the environment
3. edit details as needed
4. save the environment

### Download log BAT files
1. store one or more COM/SOM log commands in the corresponding log field
2. click **COM Logs** or **SOM Logs**
3. the app downloads one or multiple `.bat` files depending on the number of stored commands

---

## Developer credit

🐾 **Built by Vidwan Gowda** 🐾

- 🔗 LinkedIn: https://www.linkedin.com/in/gowdavidwan2003/
- 💻 GitHub: https://github.com/gowdavidwan2003
- 📦 Project Repo: https://github.com/gowdavidwan2003/SalamOSMEnvs
