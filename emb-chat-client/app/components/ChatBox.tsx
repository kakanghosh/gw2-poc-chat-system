import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ChatBox() {
  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <CssBaseline />
      <Container maxWidth='sm'>
        <div>ChatBox</div>
      </Container>
    </Box>
  );
}
