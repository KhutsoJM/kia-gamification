import { Paper, Typography } from '@mui/material';

const NumberCard = ({ number }) => {
    console.log(`Number: ${number}`);
    return (
        <Paper
            elevation={6}
            sx={{
                width: 100,
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 48,
                backgroundColor: '#ffef9f',
            }}
        >
            {number}
        </Paper>
    );
}

export default NumberCard;
