
// MUI
import { Box } from '@mui/material'

// COMPONENTS
import SafariScene from './components/SafariScene'
import Crate from './components/Crates'

// ASSETS
// fruits
import apple from '../../assets/numberSafari/fruits/normal/apple.png'
import bananas from '../../assets/numberSafari/fruits/normal/bananas.png'
import blueberry from '../../assets/numberSafari/fruits/normal/blueberry.png'
import cherries from '../../assets/numberSafari/fruits/normal/cherries.png'
import orange from '../../assets/numberSafari/fruits/normal/orange.png'
import raspberry from '../../assets/numberSafari/fruits/normal/raspberry.png'
import watermelon from '../../assets/numberSafari/fruits/normal/watermelon.png'

// crates
import crateBlue from '../../assets/numberSafari/crates/crate-blue.png';
import crateYellow from '../../assets/numberSafari/crates/crate-yellow.png';
import cratePink from '../../assets/numberSafari/crates/crate-pink.png';
import crateGreen from '../../assets/numberSafari/crates/crate-green.png';


// CRATES
const crates = [{
  id: 1,
  crate: cratePink,
  fruit: raspberry,
  fruitName: 'raspberry',
}, {
  id: 2,
  crate: crateGreen,
  fruit: apple,
  fruitName: 'apple',
}, {
  id: 3,
  crate: crateYellow,
  fruit: orange,
  fruitName: 'orange',
}
]


const NumberSafari = () => {
  return (
    <div>
      <SafariScene>
        <Box sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
        }}>
          <Box sx={{
            position: "absolute",
            bottom: "18px",
            right: "25px",
            display: "flex",
            marginInline: "28px",
            gap: "36px"
          }}
          >
            {crates.map(({ id, fruit, crate, fruitName }) => (
              <Crate key={id} fruit={fruit} crate={crate} fruitName={fruitName} />
            ))}
          </Box>
        </Box>
      </SafariScene>
    </div>
  )
}

export default NumberSafari