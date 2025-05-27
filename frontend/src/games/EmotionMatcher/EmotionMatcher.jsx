import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

import './EmotionMatcher.css'

import heart from '../../assets/images/heart-1.png';

// SFX
import correctSound from '../../assets/sounds/correct-sound.mp3';
import incorrectSound from '../../assets/sounds/incorrect-sound.wav';
import completeSound from '../../assets/sounds/complete-sound.mp3';
import wellDoneSound from '../../assets/sounds/well-done.mp3';

// COMPONENTS
import CompletionScreen from '../../pages/CompletionScreen';
import ProgressBar from '../../components/UI/ProgressBar';


const pairsData = [
  { id: 'happy', emoji: '😊', scenario: 'Your friend gave you a gift' },
  { id: 'angry', emoji: '😡', scenario: 'Someone took your toy' },
  { id: 'sad', emoji: '😢', scenario: 'You lost your pet' },
  // { id: 'scared', emoji: '😱', scenario: 'You heard a loud noise at night' },
  // { id: 'sick', emoji: '😷', scenario: 'You get cold and start sneezing at school' },
  // { id: 'confused', emoji: '🤔', scenario: 'The instructions for a game make no sense to you.' },
  // { id: 'disappointed', emoji: '😞', scenario: "You studied hard for a test but didn't get the grade you hoped for." },
  // { id: 'relieved', emoji: '😌', scenario: 'You thought you lost your phone, but then you found it in your backpack.' },
  // { id: 'surprised', emoji: '😲', scenario: 'You get an unexpected gift from a friend' },
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

  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  const [shuffledScenarios, setShuffledScenarios] = useState([]);

  const [roundTransitioning, setRoundTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');
  const roundMessages = [
    'Well done!',
    'Keep going!',
    "You're doing great!",
    'Nice work!',
  ]

  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(null);


  useEffect(() => {
    soundsRef.current = {
      correct: new Audio(correctSound),
      incorrect: new Audio(incorrectSound),
      complete: new Audio(completeSound),
      wellDone: new Audio(wellDoneSound),
    }

    soundsRef.current.correct.volume = 0.5;
    soundsRef.current.incorrect.volume = 0.5;
    soundsRef.current.complete.volume = 0.5;
    soundsRef.current.wellDone.volume = 0.5;
  }, [])

  useEffect(() => {
    const nextPairs = rounds[currentRound];

    if (nextPairs) {
      setShuffledEmojis(() => shuffle(nextPairs.map(({ id, emoji }) => ({ id, emoji }))))
      setShuffledScenarios(() => shuffle(nextPairs.map(({ id, scenario }) => ({ id, scenario }))))
    }
  }, [currentRound])


  const handleMatch = (scenarioId, emotionId) => {
    if (scenarioId === emotionId) {
      setMatched((prev) => ({ ...prev, [scenarioId]: true }));
      setScore((prev) => prev + 1);

      setCorrectMatchFeedback(scenarioId);
      score < pairsData.length - 1 && soundsRef.current.correct.play();
      setTimeout(() => setCorrectMatchFeedback(null), 300);

      // Check if round is over
      const roundPairs = rounds[currentRound];
      const completed = roundPairs.every((pair) => matched[pair.id] || pair.id === emotionId);

      completed && handleRoundAdvance();
    } else {
      setIncorrectMatchFeedback(scenarioId);
      soundsRef.current.incorrect.play();
      setTimeout(() => setIncorrectMatchFeedback(null), 1000);
    }
  }

  const handleRoundAdvance = () => {
    const message = roundMessages[Math.floor(Math.random() * roundMessages.length)];
    setTransitionMessage(message);
    setRoundTransitioning(true);
    const nextRound = currentRound + 1;
    soundsRef.current.complete.play();

    if (nextRound >= rounds.length) {
      setTimeout(() => {
        setGameCompleted(true);
        setCurrentRound(nextRound);
        soundsRef.current.wellDone.play();
        setEndTime(Date.now());
        setRoundTransitioning(false);
        setTransitionMessage('');
      }, 2000);
    } else {
      setTimeout(() => {
        setMatched({});
        setCurrentRound(nextRound);
        setRoundTransitioning(false);
      }, 1500);
    }
  }


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
        handleMatch(zone.id, id);
      }
    }
  }


  // Completion screen
  if (!rounds[currentRound]) {
    const timeTaken = endTime - startTime;

    return (
      <motion.div
        key={currentRound}
        initial={{ opacity: 0 }}
        animate={{ opacity: roundTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CompletionScreen score={score} total={pairsData.length} timeTaken={timeTaken} />
      </motion.div>
    )
  }


  // Round transition messages
  if (roundTransitioning && transitionMessage) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant='h3' color='primary'>{transitionMessage}</Typography>
        </motion.div>
      </Box>
    )
  }


  // MAIN GAME AREA
  return (
    <motion.div
      key={currentRound}
      initial={{ opacity: 0 }}
      animate={{ opacity: roundTransitioning ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      <Box p={4} sx={{
        userSelect: 'none',
        paddingInline: 38,
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        height: "100vh",
      }}>
        <Box paddingBlock="3rem">
          <Typography variant='h5'>Round: {currentRound + 1}</Typography>
          <ProgressBar progress={score} maxProgress={pairsData.length} />
        </Box>

        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={4}
          alignItems="center"
          // border="1px solid black"
          paddingBlock="2rem"
        >

          {/* Emoji Row */}
          <Grid item xs={12} mr={14}>
            <Box display="flex" justifyContent="center" flexDirection="column" gap={4} flexWrap="wrap" marginRight="25px">
              {shuffledEmojis.map(({ id, emoji }) => (
                <motion.div
                  key={id}
                  drag={!matched[id]}
                  dragSnapToOrigin
                  whileDrag={{ scale: 1.1, rotate: 7 }} // Rotates 10 degrees while dragging
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
    </motion.div>
  );
};

export default EmotionMatcher;
