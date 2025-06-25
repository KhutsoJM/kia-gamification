import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const getEmojiForFrustration = (count) => {
  if (count === 1) return "😒";
  if (count === 2) return "💢";
  if (count >= 3) return "😡";
  return null;
};

const FrustrationEmoji = ({ emoji, id }) => (
  <motion.div
    key={id}
    initial={{ y: 0, opacity: 1, scale: 1 }}
    animate={{ y: -60, opacity: 0, scale: 1.2 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
    style={{
      position: "absolute",
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "2.4rem",
      pointerEvents: "none",
    }}
  >
    {emoji}
  </motion.div>
);

const Animal = ({ animalImg, animalType, frustrationCount }) => {
  const [emojiQueue, setEmojiQueue] = useState([]);

  useEffect(() => {
    const emoji = getEmojiForFrustration(frustrationCount);
    if (!emoji) return;

    const id = Date.now() + Math.random(); // unique ID
    setEmojiQueue((prev) => [...prev, { id, emoji }]);

    const timeout = setTimeout(() => {
      setEmojiQueue((prev) => prev.filter((e) => e.id !== id));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [frustrationCount]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "clamp(60px, 10vw, 96px)",
        height: "auto",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <Box
        component="img"
        src={animalImg}
        alt={animalType}
        draggable={false}
        sx={{ width: "100%", height: "auto" }}
      />

      <AnimatePresence>
        {emojiQueue.map(({ id, emoji }) => (
          <FrustrationEmoji key={id} id={id} emoji={emoji} />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default Animal;
