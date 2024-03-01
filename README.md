# Steam Library Analyser

## Deployed app

[https://steam-library-analyser.vercel.app/](https://steam-library-analyser.vercel.app/)

## Getting started

### Prequisites

- node
- node package manager such as npm, yarn or pnpm

### 1. Environment variables

To run the application locally, you need to create a `.env.local` file at the root of the project containing the following:

```
STEAM_API_BASEPATH=http://api.steampowered.com
STEAM_API_KEY=<your steam api key>
```

### 2. Install dependencies

```bash
pnpm i
```

### 3. Start the server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API endpoint

`GET - /api/analyse`

This endpoint returns:

- Total number of games owned
- Total playtime across all games
- Most played game

```
http://localhost:3000/api/analyse?steamId=<steamid>
```
