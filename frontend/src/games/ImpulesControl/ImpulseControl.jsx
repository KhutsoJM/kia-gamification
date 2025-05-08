import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';

const PuzzleGame = () => {
  const [playerTurn, setPlayerTurn] = useState(1); // 1 or 2 for turn-taking
  const [teamworkTokens, setTeamworkTokens] = useState(0);
  const [completedPuzzle, setCompletedPuzzle] = useState(false);
  const [pieces, setPieces] = useState([
    { id: 1, shape: 'circle', color: 'red', placed: false },
    { id: 2, shape: 'square', color: 'blue', placed: false },
    { id: 3, shape: 'triangle', color: 'green', placed: false },
  ]);
  const [gridSpaces, setGridSpaces] = useState([
    { shape: 'circle', filled: false },
    { shape: 'square', filled: false },
    { shape: 'triangle', filled: false },
  ]);

  // Handle when a piece is dragged
  const handleDragStart = (e, pieceId) => {
    e.dataTransfer.setData('pieceId', pieceId);
  };

  const handleDrop = (e, index) => {
    const pieceId = e.dataTransfer.getData('pieceId');
    const piece = pieces.find((p) => p.id === parseInt(pieceId));

    if (piece && !piece.placed && gridSpaces[index].shape === piece.shape) {
      const updatedPieces = pieces.map((p) =>
        p.id === piece.id ? { ...p, placed: true } : p
      );

      const updatedGridSpaces = [...gridSpaces];
      updatedGridSpaces[index].filled = true;

      setPieces(updatedPieces);
      setGridSpaces(updatedGridSpaces);

      // Increase teamwork tokens when a piece is placed correctly
      setTeamworkTokens(teamworkTokens + 1);

      // Check if the puzzle is completed
      if (updatedGridSpaces.every((space) => space.filled)) {
        setCompletedPuzzle(true);
      }

      // Switch turns
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Cooperative Puzzle Game
      </Typography>

      {/* Show players' turn */}
      <Typography variant="h6">Player {playerTurn}'s Turn</Typography>

      {/* Puzzle Grid */}
      <Box mt={4} display="flex" flexDirection="row" justifyContent="center">
        <Grid container spacing={2} justifyContent="center" style={{ width: '400px', height: '300px' }}>
          {gridSpaces.map((space, index) => (
            <Grid
              item
              xs={4}
              key={index}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              style={{
                backgroundColor: space.filled ? 'lightgray' : 'lightblue',
                width: '100px',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                border: '2px solid #000',
              }}
            >
              {!space.filled && (
                <Typography variant="body1">{space.shape}</Typography>
              )}
              {pieces
                .filter((piece) => piece.placed && piece.shape === space.shape)
                .map((piece) => (
                  <Paper
                    key={piece.id}
                    style={{
                      backgroundColor: piece.color,
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#fff',
                    }}
                  >
                    {piece.shape}
                  </Paper>
                ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Puzzle Pieces */}
      <Box mt={4} display="flex" justifyContent="center">
        {pieces.map((piece) => (
          !piece.placed && (
            <Button
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece.id)}
              variant="outlined"
              style={{
                backgroundColor: piece.color,
                color: '#fff',
                width: '100px',
                height: '100px',
                margin: '10px',
              }}
            >
              {piece.shape}
            </Button>
          )
        ))}
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
