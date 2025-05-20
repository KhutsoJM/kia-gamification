import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'


// PAGES
import Profile from './pages/Profile';
import GameSelection from './pages/GameSelection';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

// GAMES
import EmotionMatcher from './games/EmotionMatcher/EmotionMatcher';
import ImpulseControl from './games/ImpulesControl/ImpulseControl';
import KoalaBreathingGame from './games/KoalaBreathing/KoalaBreathingGame';
import PuzzleGame from './games/PuzzleGame/PuzzleGame';
import NumberSafari from './games/NumberSafari/NumberSafari';

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
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/games" element={<GameSelection />} />
            <Route path="/emotion-matcher" element={<EmotionMatcher />} />
            <Route path="/number-safari" element={<NumberSafari />} />
          </Routes>
        </Router>
      </ThemeProvider >
    </>
  )
}

export default App