import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import basket from '../../../assets/numberSafari/wooden-bucket.png';
import { ControlPointSharp } from '@mui/icons-material';


const Basket = ({ acceptType }) => {
    const basketRef = useRef(null);
    // const [isHighlighted, setIsHighlighted] = useState(false);
    const controls = useAnimation();
    const [isHovering, setIsHovering] = useState(false);


    useEffect(() => {
        if (!window.baskets) window.baskets = {};
        window.baskets[acceptType] = basketRef;

        return () => {
            delete window.baskets[acceptType];
        };
    }, [acceptType]);

    // Animations
    const triggerShake = async () => {
        await controls.start({
            x: [0, -10, 10, -10, 10, 0],
            rotate: [0, -5, 5, -5, 5, 0],
            scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
            transition: { duration: 0.6 }
        })
    }

    // Check for hover state externally
    useEffect(() => {
        if (isHovering) {
            controls.start({ scale: 1.15 });
        } else {
            controls.start({ scale: 1 });
        }
    }, [isHovering]);

    // Expose trigger state to global state to call from parent
    useEffect(() => {
        window.basketTriggers = window.basketTriggers || {};
        window.basketTriggers[acceptType] = triggerShake;
    }, [acceptType]);


    return (
        <motion.img
            ref={basketRef}
            animate={controls}
            src={basket}
            alt="Basket"
            style={{
                height: '40px',
                width: 'auto',
                // margin: "0 8px"
                // transition: 'transform 0.3s',
                // transform: isHighlighted ? 'scale(1.25)' : 'scale(1)',
                // filter: isHighlighted ? 'drop-shadow(0 0 6px limegreen)' : 'none',
            }}
        />
    )
}

export default Basket