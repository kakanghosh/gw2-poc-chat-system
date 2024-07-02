/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from '@/app/hooks/useFetch';
import { Kingdom, User } from '@/app/models';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import React, { useEffect, useState } from 'react';
import useFetchUsersInKingdoms from '@/app/hooks/useFetchUsersInKingdoms';
import { useRouter } from 'next/navigation';

export default function ChooseStartUser() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const { state, setState } = useGlobalState();
  const { kingdoms } = state;
  const { data } = useFetch<{ kingdoms: Kingdom[] }>(
    `${BASE_API_URL}/api/v1/kingdoms`
  );
  const { data: users } = useFetchUsersInKingdoms(kingdoms);

  useEffect(() => {
    setState((prev) => ({ ...prev, sender: null }));
  }, []);

  useEffect(() => {
    if (data?.kingdoms) {
      setState((prev) => ({ ...prev, kingdoms: data?.kingdoms }));
    }
  }, [data]);

  useEffect(() => {
    if (users) {
      setState((prev) => ({ ...prev, users }));
    }
  }, [users]);

  function onSelectUser(user: User) {
    setTimeout(() => {
      router.push('/receiver');
      setState((prev) => ({ ...prev, sender: user }));
    }, 200);
  }

  return (
    <Box>
      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {users?.map((user) => (
            <Box
              onClick={() => onSelectUser(user)}
              sx={{
                cursor: 'pointer',
              }}
              key={user.id}
            >
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.getFullName()}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Kingdom
                      </Typography>
                      {`— ${user.kingdom.name}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
