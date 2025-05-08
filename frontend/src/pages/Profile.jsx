import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { EmojiEvents, Whatshot, CheckCircle } from '@mui/icons-material';

const Profile = () => {
    const progress = 65; // example progress %
    const streak = 5; // days in a row
    const achievements = ['Completed 10 tasks', 'Hit 5-day streak', 'Finished challenge #1'];
    const completedTasks = ['Breathing Exercise', 'Emotion Matching Game', 'Mindful Pause'];

    return (
        <Box p={4} bgcolor="#f5f5f5" minHeight="100vh" marginTop={1}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Progress */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        cursor: "pointer",
                    }}>
                        <Typography variant="h6">Your Progress</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {progress}% complete
                        </Typography>
                        <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />
                    </Paper>
                </Grid>

                {/* Daily Streak */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        cursor: "pointer",
                    }}>
                        <Typography variant="h6">Daily Streak</Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                            <Whatshot color="error" fontSize="large" />
                            <Typography variant="h4" ml={2}>
                                {streak} days
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Achievements */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        cursor: "pointer",
                    }}>
                        <Typography variant="h6">Recent Achievements</Typography>
                        <List>
                            {achievements.map((ach, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <EmojiEvents color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={ach} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Completed Tasks */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        cursor: "pointer",
                    }}>
                        <Typography variant="h6">Completed Tasks</Typography>
                        <List>
                            {completedTasks.map((task, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={task} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
