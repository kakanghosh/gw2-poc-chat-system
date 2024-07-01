import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { deepOrange, deepPurple, indigo } from '@mui/material/colors';

export default function Loading() {
  return (
    <Box>
      <Stack direction='row' spacing={2}>
        <Avatar>L</Avatar>
        <Avatar sx={{ bgcolor: indigo[500] }}>O</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
        <Avatar sx={{ bgcolor: indigo[500] }}>D</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>I</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: indigo[500] }}>G</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>.</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>.</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>.</Avatar>
      </Stack>
    </Box>
  );
}
