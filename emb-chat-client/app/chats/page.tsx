'use client';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';
import ChatBox from '@/app/components/ChatBox';
import UsersBox from '@/app/components/UsersBox';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatWindow() {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const { sender, receiver } = state;
  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    if (sender) {
      // Connect to socket
    }
  }, [sender]);

  useEffect(() => {
    if (!sender) {
      router.push('/');
    }
  }, [sender, router]);

  useEffect(() => {
    if (sender && receiver) {
      setShowChatBox(true);
    }
  }, [sender, receiver]);

  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UsersBox />
          </Grid>
          <Grid item xs={8}>
            {showChatBox ? (
              <ChatBox />
            ) : (
              <Box>Select user to start messaging</Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
