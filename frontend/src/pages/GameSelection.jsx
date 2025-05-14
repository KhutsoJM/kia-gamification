import { useState } from 'react';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';

const games = [
  {
    id: 'emotion-matcher',
    title: 'Emotion Matcher',
    description: 'Match emotions to real-life scenarios.',
    image: '/images/emotion.png', // Replace with actual paths
  },
  {
    id: 'breathing-game',
    title: 'Mindful Breathing',
    description: 'Sync your breath with the koala to relax.',
    image: '/images/breathing.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
  {
    id: 'impulse-control',
    title: 'Impulse Control Game',
    description: 'Pause and think before you act!',
    image: '/images/impulse.png',
  },
];

const GameSelection = ({ onSelectGame }) => {

  const [spectrum, setSpectrum] = useState('')

  const handleSelectChange = (e) => {
    setSpectrum(e.target.value)
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Choose a Game
      </Typography>
      <Box sx={{
        minWidth: 120,
        height: 30,
        marginBottom: 6,
      }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Spectrum Category</InputLabel>
          <Select
            variant='filled'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={spectrum}
            // label="spectrum"
            onChange={handleSelectChange}
          >
            <MenuItem value={'dyslexia'}>Dyslexia</MenuItem>
            <MenuItem value={'adhd'}>ADHD</MenuItem>
            <MenuItem value={'memory'}>Memory</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid display="flex" justifyContent="center" container spacing={4}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id} sx={{
            transition: "0.3s",
            '&:hover': {
              boxShadow: "7"
            }
          }}>
            <Card sx={{
              width: "276px",
              height: "100%",
              objectFit: "cover",
            }}>
              <CardActionArea sx={{ height: "100%" }} onClick={() => onSelectGame(game.id)}>

                <CardMedia
                  component="img"
                  height="160"
                  image={game.image}
                  alt={game.title}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {game.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameSelection;
