# Salam OSM ENV Navigator

A premium, shared environment navigator built for the team. 
Features a Vercel Postgres database backend, Dark/Light modes, copying info to clipboard, and automated BAT file script generation to instantly SSH into dev servers.

## Tech Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript (served statically)
- **Backend:** Node.js Serverless Functions (Vercel API)
- **Database:** Vercel Postgres

## Deployment Instructions

Since this app uses a shared cloud database, the easiest way to launch it is entirely inside Vercel.

**Option 1 (Using Vercel Dashboard directly):**
1. Push this folder to a GitHub repository (e.g. `salam-osm-envs`).
2. Log into [Vercel](https://vercel.com/) and click "Add New Project", choose your repository.
3. Once deployed, go to the **Storage** tab in your Vercel project, and "Create Database" -> choose **Vercel Postgres**.
4. Connect the database to your Vercel project. Vercel will automatically add the `POSTGRES_URL` variables to the environment.
5. Redeploy your project so it picks up the variables.
6. Open an API client (like Postman or just a curl command) and make a single `POST` request to `https://<YOUR-VERCEL-URL>/api/seed` to seed your 20 initial environments!

**Option 2 (Using Vercel CLI locally):**
1. Install the Vercel CLI: `npm install -g vercel`
2. Log in through the CLI: `vercel login`
3. Run `npx vercel link` to link/create the project.
4. Run `npx vercel env pull .env.development.local` if you've created a database on Vercel's dashboard, so you can test locally.
5. Run `npx vercel dev` to start the local development server on `localhost:3000`.
6. Push to production by running `npx vercel --prod`.

## Seeding the initial database
After your first deployment, make a POST request to the application to insert the existing 20 environments. You can do this perfectly securely:
```bash
curl -X POST https://your-project.vercel.app/api/seed
```
If you start locally, run:
```bash
curl -X POST http://localhost:3000/api/seed
```
This script handles duplicates safely.

## AI Prompt Suggestion for Auto-Filling Data
Since your environment details come in unstructured formats, you can run this prompt in ChatGPT or Gemini with the raw text to convert it into raw JSON that matches the Edit fields:

> "I have raw server details. Act as a data parser. Extract mapping for: environment name, group (PROD/SIT/UAT/etc), weblogic URLs, orchestration URLs, order management URLs, COM db host/port/service strings, and server credentials. Format it into a clean list outlining the values clearly so I can copy/paste them into a UI config screen."
