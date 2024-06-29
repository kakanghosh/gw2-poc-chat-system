import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import UserDisplay from '@/app/components/UserDisplay';
import { User } from '@/app/models';
import Checkbox from '@mui/material/Checkbox';

export default function UserList() {
  const userList: User[] = [
    new User({ id: 1, name: 'Luminara' }, 1, 'Ashley', 'Rodriguez', false),
    new User({ id: 1, name: 'Luminara' }, 2, 'David', 'Miller', false),
    new User({ id: 2, name: 'Luminara' }, 3, 'Jane', 'Doe', false),
    new User({ id: 2, name: 'Luminara' }, 4, 'Michael', 'Johnson', false),
  ];

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {userList.map((user) => (
        <div key={user.id}>
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
        </div>
      ))}
    </List>
  );
}
