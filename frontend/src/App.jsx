import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './App.css'


// PAGES
import Profile from './pages/Profile';
import GameSelection from './pages/GameSelection';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import RegisterThankYou from './pages/auth/RegisterThankYou';

// GAMES
import EmotionMatcher from './games/EmotionMatcher/EmotionMatcher';
import ImpulseControl from './games/ImpulesControl/ImpulseControl';
import KoalaBreathingGame from './games/KoalaBreathing/KoalaBreathingGame';
import PuzzleGame from './games/PuzzleGame/PuzzleGame';
import NumberSafari from './games/NumberSafari/NumberSafari';
import FruitFall from './games/FruitFall/FruitFall';

// UI
import Navbar from './components/UI/Navbar';
import PageLayout from './components/PageLayout';


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
        <AuthProvider>
          <Router>
            <Routes>
              <Route element={<PageLayout hasNavbar />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/thanks" element={<RegisterThankYou />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/games" element={<GameSelection />} />
              </Route>

              {/* PAGES WITHOUT NAVBARS */}
              <Route element={<PageLayout hasNavbar={false} />}>
                <Route path="/emotion-matcher" element={<EmotionMatcher />} />
                <Route path="/number-safari" element={<NumberSafari />} />
                <Route path="/fruitfall" element={<FruitFall />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider >
    </>
  )
}

export default App