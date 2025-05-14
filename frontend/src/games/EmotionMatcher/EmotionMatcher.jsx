import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion'

import ProgressBar from '../../components/UI/ProgressBar';

import correctSound from '../../assets/sounds/correct-sound.mp3';
import incorrectSound from '../../assets/sounds/incorrect-sound.wav';
import completeSound from '../../assets/sounds/complete-sound.mp3';


const pairsData = [
  { id: 'happy', emoji: '😊', scenario: 'Your friend gave you a gift' },
  { id: 'angry', emoji: '😡', scenario: 'Someone took your toy' },
  { id: 'sad', emoji: '😢', scenario: 'You lost your pet' },
  { id: 'scared', emoji: '😱', scenario: 'You heard a loud noise at night' },
  { id: 'sick', emoji: '😷', scenario: 'You get cold and start sneezing at school' },
  { id: 'confused', emoji: '🤔', scenario: 'The instructions for a game make no sense to you.' },
  { id: 'disappointed', emoji: '😞', scenario: "You studied hard for a test but didn't get the grade you hoped for." },
  { id: 'relieved', emoji: '😌', scenario: 'You thought you lost your phone, but then you found it in your backpack.' },
  { id: 'surprised', emoji: '😲', scenario: 'You get an unexpected gift from a friend' },
]



const EmotionMatcher = () => {
  // Helper function to shuffle arrays
  const shuffle = (array) => {
    const arr = [...array]; // Make a copy to avoid mutating original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // pick a random index <= i
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
    }
    return arr;
  }

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }


  // Emotion and Scenario cards States
  const [matched, setMatched] = useState({});
  const [score, setScore] = useState(0);

  const [correctMatchFeedback, setCorrectMatchFeedback] = useState(null);
  const [incorrectMatchFeedback, setIncorrectMatchFeedback] = useState(null);

  const zoneRefs = useRef({});
  const soundsRef = useRef();

  // Rounds
  const [rounds, setRounds] = useState(chunkArray((shuffle(pairsData)), 3)); // 3 items per round
  const [currentRound, setCurrentRound] = useState(0);

  const [shuffledEmojis, setShuffledEmojis] = useState([])
  const [shuffledScenarios, setShuffledScenarios] = useState([])


  useEffect(() => {
    soundsRef.current = {
      correct: new Audio(correctSound),
      incorrect: new Audio(incorrectSound),
      complete: new Audio(completeSound),
    }

    soundsRef.current.correct.volume = 0.5;
    soundsRef.current.incorrect.volume = 0.5;
    soundsRef.current.complete.volume = 0.5;
  }, [])

  useEffect(() => {
    if (rounds[currentRound]) {
      setShuffledEmojis(() => shuffle(rounds[currentRound].map(({ id, emoji }) => ({ id, emoji }))))
      setShuffledScenarios(() => shuffle(rounds[currentRound].map(({ id, scenario }) => ({ id, scenario }))))
    }
  }, [currentRound])


  const handleDragEnd = (event, info, id) => {
    const pointer = info.point;

    const adjustedX = pointer.x;
    const adjustedY = pointer.y;

    for (const zone of rounds[currentRound]) {
      const zoneEl = zoneRefs.current[zone.id];
      if (!zoneEl || matched[zone.id]) continue;

      const rect = zoneEl.getBoundingClientRect();
      const inZone =
        adjustedX >= rect.left + window.scrollX &&
        adjustedX <= rect.right + window.scrollX &&
        adjustedY >= rect.top + window.scrollY &&
        adjustedY <= rect.bottom + window.scrollY;

      if (inZone) {
        if (zone.id === id) {
          setMatched((prev) => ({ ...prev, [zone.id]: true }));
          setScore((prev) => prev + 1);

          setCorrectMatchFeedback(zone.id);
          score < pairsData.length - 1 && soundsRef.current.correct.play();
          setTimeout(() => setCorrectMatchFeedback(null), 1000);

          // Check if round is over
          const roundPairs = rounds[currentRound];
          const completed = roundPairs.every((pair) => matched[pair.id] || pair.id === id);

          if (completed) {
            soundsRef.current.complete.play();

            setTimeout(() => {
              setMatched({});
              setCurrentRound((prev) => prev + 1);
            }, 1000);
          }

        } else {
          setIncorrectMatchFeedback(zone.id);
          soundsRef.current.incorrect.play();
          setTimeout(() => setIncorrectMatchFeedback(null), 1000);
        }
        break;
      }
    }
  }

  if (!rounds[currentRound]) {
    return (
      <Box p={4}>
        <Typography variant='h4'>All rounds complete!</Typography>
      </Box>
    )
  }

  return (
    <Box p={4} sx={{
      userSelect: 'none'
    }}>
      <Typography variant='h5'>Round: {currentRound + 1}</Typography>
      <ProgressBar progress={score} maxProgress={pairsData.length} />

      <Grid container display="flex" justifyContent="center" spacing={4}>
        {/* Emoji Row */}
        <Grid item xs={12} mr={14}>
          <Box display="flex" justifyContent="center" flexDirection="column" gap={4} flexWrap="wrap" marginRight="25px">
            {shuffledEmojis.map(({ id, emoji }) => (
              <motion.div
                key={id}
                drag={!matched[id]}
                dragSnapToOrigin
                whileDrag={{ scale: 1.1, rotate: 10 }} // Rotates 10 degrees while dragging
                // draggable={!matched[id]}
                onDragEnd={(e, info) => handleDragEnd(e, info, id)}
              >
                <Paper
                  sx={{
                    minWidth: 300,
                    height: 90,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    // cursor: matched[id] ? 'default' : 'grab',
                    opacity: matched[id] ? 0.3 : 1,
                    boxShadow: '3',
                    '&:hover': {
                      boxShadow: !matched[id] ? '8' : '2',
                    },
                  }}
                >
                  {emoji}
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Grid>

        {/* Scenario Drop Zones */}
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" gap={4}>
            {shuffledScenarios.map(({ id, scenario }) => (
              <Paper
                key={id}
                elevation={2}
                ref={(el) => (zoneRefs.current[id] = el)}
                sx={{
                  position: 'relative',
                  padding: 2,
                  height: 90,
                  minHeight: 80,
                  minWidth: 350,
                  maxWidth: 350,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: matched[id] ? '#d0f0c0' : '#f9f9f9',
                  border: '2px dashed #ccc',
                  textAlign: 'center',
                  overflow: 'hidden',
                  zIndex: '-1',
                }}
              >
                <Typography>{scenario}</Typography>

                {correctMatchFeedback === id && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 0.75 }}
                    style={{
                      position: 'absolute',
                      // top: '50%',
                      // left: '50%',
                      width: 100,
                      height: 100,
                      background: 'radial-gradient(circle, #6a994e, transparent)',
                      borderRadius: '50%',
                      // transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}

                {incorrectMatchFeedback === id && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 0.75 }}
                    style={{
                      position: 'absolute',
                      // top: '50%',
                      // left: '50%',
                      width: 100,
                      height: 100,
                      background: 'radial-gradient(circle,rgb(237, 66, 66), transparent)',
                      borderRadius: '50%',
                      // transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}

              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmotionMatcher;
