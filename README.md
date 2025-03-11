# LiveStore Workshop 2025

A modern monorepo project featuring a web application, mobile Expo app, and sync server for real-time data synchronization.

## Project Structure

This project is organized as a monorepo using npm workspaces with the following packages:

- `packages/web`: Web application
- `packages/mobile`: Mobile application
- `packages/sync-backend`: Backend service for data synchronization

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Bun](https://bun.sh/) - Used as package manager and runtime
- [Git](https://git-scm.com/) for version control

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/betomoedano/livestore-workshop-app
   cd livestore-workshop-app
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Configure environment variables:

   For the mobile application, create a `.env.local` file in the `packages/mobile` directory:

   ```bash
   cd packages/mobile
   cp .env.local.example .env.local
   ```

   Then edit the `.env.local` file to set your sync server URL:

   ```
   EXPO_PUBLIC_LIVESTORE_SYNC_URL=http://localhost:8787
   ```

4. Set up the Cloudflare D1 database for the sync backend:

   ```bash
   cd packages/sync-backend
   ```

   Create a new D1 database in Cloudflare:

   ```bash
   npx wrangler d1 create livestore-sync-cf-demo
   ```

   This will output something like:

   ```
   ✅ Successfully created DB 'livestore-sync-cf-demo' in account 'your-account'
   Created database 'livestore-sync-cf-demo' with ID: fd58992d-e1fd-45a2-9e41-2f1bbe80f7ea
   ```

   Update the `wrangler.toml` file with your database ID:

   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "livestore-sync-cf-demo"
   database_id = "your-database-id-here"
   ```

5. Start the development servers:

   For the web application:

   ```bash
   cd packages/web
   bun run dev
   ```

   For the mobile application:

   ```bash
   cd packages/mobile
   bun run start
   ```

   For the sync backend:

   ```bash
   cd packages/sync-backend
   bun run dev
   ```

## Development

This project uses:

- Bun as the package manager and runtime environment
- npm workspaces for monorepo management
- Modern JavaScript/TypeScript development practices
