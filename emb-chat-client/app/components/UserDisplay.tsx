import * as React from 'react';
import { User } from '@/app/models';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function UserDisplay({ user }: { user: User }) {
  const [selected, setSelected] = React.useState(false);

  return (
    <div style={{ display: 'flex' }}>
      {user.getFullName()} {user.onlineStatus ? 'online' : 'Offline'}{' '}
    </div>
  );
}
