/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { User } from '@/app/models';
import Link from 'next/link';
import useFetchUsersInKingdoms from '../hooks/useFetchUsersInKingdoms';

export default function GetStartedUserSelect() {
  const { state, setState } = useGlobalState();
  const { users, kingdoms, sender } = state;
  const { data } = useFetchUsersInKingdoms(kingdoms);

  function selectAsYou(user: User) {
    setState((prev) => ({ ...prev, sender: user }));
  }

  useEffect(() => {
    if (data) {
      setState((prev) => ({ ...prev, users: data }));
    }
  }, [data]);

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
