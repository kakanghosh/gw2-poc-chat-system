import * as React from 'react';
import { User } from '@/app/models';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';
import { Box, Grid } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function UserDisplay({ user }: { user: User }) {
  const [selected, setSelected] = React.useState(false);

  return (
    <Box>
      <Grid container columnGap={2}>
        <Grid xs={8}>{user.getFullName()} </Grid>
        <Grid>
          {user.onlineStatus ? (
            <PanoramaFishEyeTwoToneIcon color='success' />
          ) : (
            <PanoramaFishEyeTwoToneIcon color='error' />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
