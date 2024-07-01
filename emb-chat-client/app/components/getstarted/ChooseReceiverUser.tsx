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
import UserDisplay from '../UserDisplay';

export default function ChooseReceiverUser() {
  const router = useRouter();
  const { state, setState } = useGlobalState();
  const { kingdoms, sender, receiver } = state;
  const { data: users } = useFetchUsersInKingdoms(kingdoms);
  const filteredusers = users?.filter((user) => user.id != sender?.id);

  useEffect(() => {
    if (users) {
      setState((prev) => ({ ...prev, users }));
    }
  }, [users]);

  useEffect(() => {
    if (!sender) {
      router.push('/');
    }
    setState((prev) => ({ ...prev, receiver: undefined }));
  }, [router]);

  function onSelectUser(user: User) {
    setTimeout(() => {
      router.push('/chats');
      setState((prev) => ({ ...prev, receiver: user }));
    }, 200);
  }

  return (
    <Box>
      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {filteredusers?.map((user) => (
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
                  primary={<UserDisplay user={user} />}
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
