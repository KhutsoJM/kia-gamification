import { useEffect } from 'react';
import { Box } from '@mui/material';
import banana from '../../../assets/images/heart.png';

const QuantityGroup = ({ quantity, foodType, onMatch }) => {
    useEffect(() => {
        // Play a sound or trigger counting animation
    }, [quantity]);

    return (
        <Box display="flex" gap={1} onClick={onMatch} sx={{ cursor: 'pointer' }}>
            {Array.from({ length: quantity }).map((_, i) => (
                <img key={i} src={banana} alt="banana" style={{ width: 50 }} />
            ))}
        </Box>
    );
}

export default QuantityGroup;