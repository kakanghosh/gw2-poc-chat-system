import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import UserList from '@/app/components/UserList';

export default function UsersBox() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      <Container maxWidth='sm'>
        <UserList />
        <UserList />
        <UserList />
      </Container>
    </Box>
  );
}
