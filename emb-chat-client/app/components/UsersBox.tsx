/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { ListItem, ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import UserDisplay from '@/app/components/UserDisplay';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { User } from '../models';
import useFetchUsersInKingdoms from '@/app/hooks/useFetchUsersInKingdoms';

export default function UsersBox() {
  const { state, setState } = useGlobalState();
  const { users, sender, receiver, kingdoms } = state;
  const { data } = useFetchUsersInKingdoms(kingdoms);
  const mappedUsers = users.filter((user) => user.id != sender?.id);

  function selectReceiverUser(receiver: User) {
    setState((prev) => ({ ...prev, receiver }));
  }

  useEffect(() => {
    if (data) {
      setState((prev) => ({ ...prev, users: data }));
    }
  }, [data]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '90vh',
        overflow: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth='sm'>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {mappedUsers.map((user) => (
            <Box
              sx={{
                cursor: 'pointer',
                backgroundColor:
                  receiver && receiver.id == user.id ? '#bcdbff' : '',
              }}
              key={user.id}
              onClick={() => selectReceiverUser(user)}
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
      </Container>
    </Box>
  );
}
