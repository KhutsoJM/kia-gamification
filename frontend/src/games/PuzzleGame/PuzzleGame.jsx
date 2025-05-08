import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const PuzzleGame = () => {
  const [playerTurn, setPlayerTurn] = useState(1); // 1 or 2 for turn-taking
  const [teamworkTokens, setTeamworkTokens] = useState(0);
  const [completedPuzzle, setCompletedPuzzle] = useState(false);

  // Puzzle pieces and players
  const pieces = [
    { id: 1, shape: 'circle', color: 'red' },
    { id: 2, shape: 'square', color: 'blue' },
    { id: 3, shape: 'triangle', color: 'green' },
    { id: 4, shape: 'hexagon', color: 'yellow' },
  ];

  // Handle when a player places a piece
  const handlePiecePlacement = (piece) => {
    if (
      (playerTurn === 1 && piece.color === 'red') ||
      (playerTurn === 2 && piece.color === 'blue')
    ) {
      // Increase teamwork tokens on correct placement
      setTeamworkTokens(teamworkTokens + 1);

      // Check if all pieces are placed
      if (teamworkTokens === pieces.length - 1) {
        setCompletedPuzzle(true);
      }

      // Switch turn to the other player
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    } else {
      alert('It\'s not your turn! Please wait for your turn.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Cooperative Puzzle Game
      </Typography>

      {/* Show players' turn */}
      <Typography variant="h6">
        Player {playerTurn}'s Turn
      </Typography>

      <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
        <Grid container spacing={2} justifyContent="center">
          {pieces.map((piece) => (
            <Grid item xs={3} key={piece.id}>
              <Button
                variant="outlined"
                onClick={() => handlePiecePlacement(piece)}
                style={{ backgroundColor: piece.color, color: '#fff', width: '100px', height: '100px' }}
              >
                {piece.shape}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Show teamwork tokens */}
      <Typography variant="h6" mt={2}>
        Teamwork Tokens: {teamworkTokens}
      </Typography>

      {/* Show completed puzzle message */}
      {completedPuzzle && (
        <Typography variant="h5" color="primary" mt={3}>
          Puzzle Completed! 🎉 You built the Friendship Flag!
        </Typography>
      )}

      {/* Show "Build Friendship Flag" button when puzzle is complete */}
      {completedPuzzle && (
        <Button variant="contained" color="primary" mt={2}>
          Build Friendship Flag
        </Button>
      )}
    </Box>
  );
};

export default PuzzleGame;
