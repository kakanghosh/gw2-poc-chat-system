import { Box } from '@mui/material';
import React from 'react';
import Loading from './components/loading/Loading';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100wh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b446de3',
        color: '#1b446de3',
      }}
    >
      <Loading />
    </Box>
  );
}
