/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Kingdom } from '@/app/models';
import useFetch from '@/app/hooks/useFetch';

export default function BridgeMessage() {
  const { state, setState } = useGlobalState();
  const { kingdoms } = state;
  const { title, description } = state.message;
  const { data } = useFetch<{ kingdoms: Kingdom[] }>(
    'http://localhost:8080/api/v1/kingdoms'
  );

  function concatenateWithAnd(arr: string[]) {
    if (arr.length === 0) {
      return '';
    }
    if (arr.length === 1) {
      return arr[0];
    }
    if (arr.length === 2) {
      return `${arr[0]} & ${arr[1]}`;
    }

    const lastElement = arr.pop();
    return `${arr.join(', ')} & ${lastElement}`;
  }

  useEffect(() => {
    if (data?.kingdoms) {
      setState((prev) => ({ ...prev, kingdoms: data?.kingdoms }));
    }
  }, [data]);

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
          <Typography variant='h4' gutterBottom>
            {concatenateWithAnd(kingdoms.map((kingdom) => kingdom.name))}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
