import React from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { Box, Grid } from '@mui/material';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

export default function HeaderMessage() {
  const { state, setState } = useGlobalState();
  const { sender, receiver } = state;

  function showMessage() {
    const onlySenderSelected = sender && !receiver;
    const bothSelected = sender && receiver;
    const noneSelected = !sender && !receiver;

    if (noneSelected) {
      return <Box>Choose you</Box>;
    } else if (onlySenderSelected) {
      return <Box>{sender.firstName}, please choose receiver </Box>;
    } else if (bothSelected) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {sender.firstName} - {receiver.firstName}
          </Box>
          <Box>
            <Grid>
              {receiver.onlineStatus ? (
                <PanoramaFishEyeTwoToneIcon color='success' />
              ) : (
                <PanoramaFishEyeTwoToneIcon color='error' />
              )}
            </Grid>
          </Box>
        </Box>
      );
    }
  }
  return <Box>{showMessage()}</Box>;
}
