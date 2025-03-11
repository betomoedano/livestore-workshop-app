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

3. Start the development servers:

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
