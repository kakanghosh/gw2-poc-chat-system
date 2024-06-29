'use client';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';
import BridgeMessage from '@/app/components/BridgeMessage';
import Box from '@mui/material/Box';
import GetStartedUserSelect from '@/app//components/GetStartedUserSelect';

export default function ChatApp() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <BridgeMessage />
        <GetStartedUserSelect />
      </Box>
    </Box>
  );
}
