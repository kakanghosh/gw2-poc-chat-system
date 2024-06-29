'use client';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';
import ChatBox from '@/app/components/ChatBox';
import UsersBox from '@/app/components/UsersBox';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

export default function ChatWindow() {
  return (
    <main>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UsersBox />
          </Grid>
          <Grid item xs={8}>
            <ChatBox />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
