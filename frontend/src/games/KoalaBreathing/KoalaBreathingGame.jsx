import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion'

const breathCycle = 4000; // 4 seconds per cycle (inhale + exhale)
const gameDuration = 2 * 60 * 1000; // 2 minutes

const KoalaBreathingGame = () => {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [cycleStart, setCycleStart] = useState(Date.now());
  const [gameEnd, setGameEnd] = useState(null);

  useEffect(() => {
    let interval;
    if (started) {
      setGameEnd(Date.now() + gameDuration);
      interval = setInterval(() => {
        setProgress(prev => prev + 100);
        if (Date.now() >= gameEnd) {
          clearInterval(interval);
          setStarted(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, gameEnd]);

  const handleTap = () => {
    const now = Date.now();
    const phase = (now - cycleStart) % breathCycle;
    const distanceFromIdeal = Math.abs(phase - breathCycle / 2);
    if (distanceFromIdeal < 800) {
      setScore(s => s + 1);
    }
  };

  return (
    <motion.div
      // drag
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: 9,
          }}
        >
          Mindful Breathing Game
        </Typography>
        <Box
          onClick={handleTap}
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: '#a5d6a7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            cursor: 'pointer',
            animation: started ? 'breathe 4s ease-in-out infinite' : 'none',
            marginBottom: 9
          }}
        >
          🐨
        </Box>
        <Typography mt={2}>Score: {score}</Typography>
        <Box width="50%" mt={2}>
          <LinearProgress variant="determinate" value={(Date.now() - (gameEnd - gameDuration)) / gameDuration * 100} />
        </Box>
        {!started && <Button variant="contained" onClick={() => { setScore(0); setProgress(0); setCycleStart(Date.now()); setStarted(true); }}>Start</Button>}

        <style>
          {`
          @keyframes breathe {
            0% { transform: scale(1); }
            60% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
        </style>
      </Box>
    </motion.div>
  );
};

export default KoalaBreathingGame;
