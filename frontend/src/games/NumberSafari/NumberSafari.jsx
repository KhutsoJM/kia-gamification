// NumberSafari.js
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import jungleBg from '../../assets/images/safari-environment.png';

import NumberCard from './components/NumberCard';
import QuantityGroup from './components/QuantityGroup';
import CompletionScreen from './components/CompletionScreen';

const numberData = [
  { id: 1, number: 3, quantity: 3, foodType: 'banana' },
  { id: 2, number: 5, quantity: 5, foodType: 'banana' },
  { id: 3, number: 2, quantity: 2, foodType: 'banana' },
];

const  NumberSafari = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [matched, setMatched] = useState(false);

  const currentData = numberData[currentRound];

  const handleMatch = () => {
    setMatched(true);
    setTimeout(() => {
      setMatched(false);
      setCurrentRound((prev) => prev + 1);
    }, 1500);
  };

  if (currentRound >= numberData.length) {
    return <CompletionScreen />;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${jungleBg})`,
        backgroundSize: 'cover',
        // height: '100vh',
        height: '150vh',
        // width: '300vh',
        p: 4,
        color: 'white',
      }}
    >
      <Typography variant="h4" mb={3}>🐾 Number Safari</Typography>

      <Typography variant="h5">Match the number to the correct group of bananas!</Typography>

      <Box display="flex" gap={4} mt={5}>
        <NumberCard number={currentData.number} />
        <QuantityGroup
          quantity={currentData.quantity}
          foodType={currentData.foodType}
          onMatch={handleMatch}
        />
      </Box>

      {matched && <Typography variant="h6" mt={4}>Well Done! 🎉</Typography>}
    </Box>
  );
}

export default NumberSafari;
