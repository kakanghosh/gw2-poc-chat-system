import React, { useEffect } from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import { Kingdom } from '../models';

export default function BridgeMessage() {
  const { state, setState } = useGlobalState();
  const { title, description } = state.message;

  async function getAllKingdoms() {
    const response = await fetch('http://localhost:8080/api/v1/kingdoms');
    var { kingdoms }: { kingdoms: Kingdom[] } = await response.json();
    setState((prev) => ({ ...prev, kingdoms }));
  }

  useEffect(() => {
    getAllKingdoms();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} minHeight={160}>
        <Grid
          xs
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h3' gutterBottom>
            {title}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
