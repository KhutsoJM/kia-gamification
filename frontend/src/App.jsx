import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import './App.css'

// PAGES
import Register from './pages/Register';
import Profile from './pages/Profile';
import GameSelection from './pages/GameSelection';

// GAMES
import EmotionMatcher from './games/EmotionMatcher/EmotionMatcher';
import ImpulseControl from './games/ImpulesControl/ImpulseControl';
import KoalaBreathingGame from './games/KoalaBreathing/KoalaBreathingGame';
import PuzzleGame from './games/PuzzleGame/PuzzleGame';

// UI
import Navbar from './components/UI/Navbar';


const theme = createTheme({
  typography: {
    fontFamily: 'Fredoka, sans-serif',
    fontWeightBold: 'bold'
  },
});



function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {/* <EmotionMatcher /> */}
        {/* <Register /> */}
        <Profile />
        {/* <GameSelection /> */}

        {/* <PuzzleGame /> */}
        {/* <KoalaBreathingGame /> */}
      </ThemeProvider >
    </>
  )
}

export default App