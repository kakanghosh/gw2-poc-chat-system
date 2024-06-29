import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100wh',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Typography variant='h4' gutterBottom>
        Loading...
      </Typography>
    </Box>
  );
}
