import { Avatar, Box, Button, Chip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { Kingdom } from '@/app/models';

export default function GetStartedUserSelect() {
  const { state, setState } = useGlobalState();
  const { users, kingdoms } = state;

  async function fetchAllUserOfAllKingdoms(kingdoms: Kingdom[]) {
    const urls = kingdoms.map(
      (kingdom) => `http://localhost:8080/api/v1/users/kingdoms/${kingdom.id}`
    );
    const results = await Promise.all(
      urls.map(async (url) => await fetch(url))
    );
    results.forEach((result, index) => {
      console.log(`Data from URL ${index + 1}:`, result);
    });
  }

  useEffect(() => {
    console.log(kingdoms);
    fetchAllUserOfAllKingdoms(kingdoms);
  }, [kingdoms]);

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        <Typography variant='h4' gutterBottom>
          Select as you to Get started
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: 1000,
          maxWidth: 1000,
          overflowX: 'scroll',
        }}
      >
        {users.map((user) => (
          <Chip
            key={user.id}
            avatar={<Avatar alt={user.firstName} />}
            label={user.getFullName()}
            variant='outlined'
          />
        ))}
      </Box>
      <Button>Get Start</Button>
    </Box>
  );
}
