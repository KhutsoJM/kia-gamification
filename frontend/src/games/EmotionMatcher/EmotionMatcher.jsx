import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion'

import ProgressBar from '../../components/UI/ProgressBar';

import correctSound from '../../assets/sounds/correct-sound.mp3';
import completeSound from '../../assets/sounds/complete-sound.mp3';


const emojis = [
  { id: 'happy', emoji: '😊' },
  { id: 'angry', emoji: '😡' },
  { id: 'sad', emoji: '😢' },
  { id: 'scared', emoji: '😱' },
  { id: 'sick', emoji: '😷' },
];

const scenarios = [
  { id: 'happy', text: 'Your friend gave you a gift' },
  { id: 'angry', text: 'Someone took your toy' },
  { id: 'sad', text: 'You lost your pet' },
  { id: 'scared', text: 'You heard a loud noise at night' },
  { id: 'sick', text: 'You get cold and start sneezing at school' },
];



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

  const [matched, setMatched] = useState({});
  const [shuffledEmojis] = useState(() => shuffle(emojis))
  const [shuffledScenarios] = useState(() => shuffle(scenarios))
  const [selectedId, setSelectedId] = useState()
  const [score, setScore] = useState(0)
  const [matchFeedback, setMatchFeedback] = useState(null)

  const zoneRefs = useRef({});
  const soundsRef = useRef();

  useEffect(() => {
    soundsRef.current = {
      correct: new Audio(correctSound),
      complete: new Audio(completeSound),
    }

    soundsRef.current.correct.volume = 0.5;
  }, [])


  const handleDragEnd = (event, info, id) => {
    const pointer = info.point;

    const adjustedX = pointer.x;
    const adjustedY = pointer.y;

    for (const zone of shuffledScenarios) {
      const zoneEl = zoneRefs.current[zone.id];
      if (!zoneEl || matched[zone.id]) continue;

      const rect = zoneEl.getBoundingClientRect();
      const inZone =
        adjustedX >= rect.left + window.scrollX &&
        adjustedX <= rect.right + window.scrollX &&
        adjustedY >= rect.top + window.scrollY &&
        adjustedY <= rect.bottom + window.scrollY;

      if (inZone && zone.id === id) {
        setMatched((prev) => ({ ...prev, [zone.id]: true }));
        setScore((prev) => prev + 1);

        score < scenarios.length - 1 ? soundsRef.current.correct.play() : soundsRef.current.complete.play()
        soundsRef.current.correct.play()
        setMatchFeedback(zone.id);
        setTimeout(() => setMatchFeedback(null), 1000);
        break;
      }
    }
  }


  return (
    <Box p={4} sx={{
      userSelect: 'none'
    }}>
      <Box mb={4}>
        <ProgressBar
          progress={score}
          maxProgress={scenarios.length}
        />
      </Box>

      <Grid container display="flex" justifyContent="center" spacing={4}>
        {/* Emoji Row */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" flexDirection="column" gap={4} flexWrap="wrap" marginRight="25px">
            {shuffledEmojis.map(({ id, emoji }) => (
              <motion.div
                key={id}
                drag={!matched[id]}
                dragSnapToOrigin
                whileDrag={{ scale: 1.1, rotate: 10 }} // Rotates 10 degrees while dragging
                // draggable={!matched[id]}
                onDragStart={() => setSelectedId(id)}
                onDragEnd={(e, info) => handleDragEnd(e, info, id)}
              >
                <Paper
                  sx={{
                    width: 300,
                    height: 115,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    cursor: matched[id] ? 'default' : 'grab',
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
            {shuffledScenarios.map(({ id, text }) => (
              <Paper
                key={id}
                elevation={2}
                ref={(el) => (zoneRefs.current[id] = el)}
                sx={{
                  position: 'relative',
                  padding: 2,
                  minHeight: 80,
                  backgroundColor: matched[id] ? '#d0f0c0' : '#f9f9f9',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '115px',
                  textAlign: 'center',
                  overflow: 'hidden',
                  zIndex: '-1',
                }}
              >
                <Typography>{text}</Typography>

                {matchFeedback === id && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 1 }}
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

              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmotionMatcher;
