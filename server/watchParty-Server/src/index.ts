import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/live-match', async (_req, res) => {
  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY as string,
      },
    });

    const data = await response.json();
    const match = data.response[0] || null;

    return res.json(match);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching live match' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});