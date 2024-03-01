# Steam Library Analyser

## Deployed app

[https://steam-library-analyser.vercel.app/](https://steam-library-analyser.vercel.app/)

## Getting started

### Prerequisites

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

## Testing

Run tests with the command

```
pnpm test
```

## Backend API endpoint

`GET - /api/analyse`

This endpoint returns:

- Total number of games owned
- Total playtime across all games
- Most played game

```
http://localhost:3000/api/analyse?steamId=<steamid>
```

## Bonus Feature Idea

### AI Generated Player Image

Use AI to generate a unique player image based on the analysis of their gamer profile. We can add some branding and make it appealing to share on social media to increase virality.

Example input to the AI generator could be:

"Player with 500 hours of gameplay time, owns 325 games and has played League of Legends the most."

The application has a placeholder image to show what it could look like on the page.
