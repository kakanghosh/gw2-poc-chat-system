import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { Kingdom, User } from '@/app/models';
import Link from 'next/link';

export default function GetStartedUserSelect() {
  const { state, setState } = useGlobalState();
  const { users, kingdoms, sender } = state;

  async function fetchAllUserOfAllKingdoms(kingdoms: Kingdom[]) {
    const urls: string[] = kingdoms.map(
      (kingdom) => `http://localhost:8080/api/v1/users/kingdoms/${kingdom.id}`
    );
    const results = await Promise.all(
      urls.map(async (url) => await fetch(url))
    );
    const mappedUsers: User[] = [];
    for (let i = 0; i < results.length; i++) {
      const { users }: { users: User[] } = await results[i].json();
      mappedUsers.push(
        ...users.map(
          (user) =>
            new User(
              kingdoms[i],
              user.id,
              user.firstName,
              user.lastName,
              user.onlineStatus
            )
        )
      );
    }
    setState((prev) => ({ ...prev, users: mappedUsers }));
  }

  function selectAsYou(user: User) {
    setState((prev) => ({ ...prev, sender: user }));
  }

  useEffect(() => {
    fetchAllUserOfAllKingdoms(kingdoms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Select user to Get started
        </Typography>
      </Box>

      {users.length == 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <Typography variant='h4' gutterBottom>
            Users Loading...
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      <Box
        sx={{
          display: 'flex',
          width: 1000,
          maxWidth: 1000,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <Stack direction='row' spacing={1}>
          {users.map((user) => (
            <Chip
              onClick={() => {
                selectAsYou(user);
              }}
              color='primary'
              variant='outlined'
              key={user.id}
              avatar={<Avatar alt={user.firstName} />}
              label={`${user.getFullName()} - [${user.kingdom.name}]`}
            />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        {sender ? (
          <Link style={{ marginTop: '2%' }} href={'/chats'}>
            <Button color='primary' variant='contained'>
              Get Start as {sender.firstName}
            </Button>
          </Link>
        ) : (
          <> </>
        )}
      </Box>
    </Box>
  );
}
