import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';

export default function WriteMessageBox() {
  const [message, setMessage] = useState('');

  function sendMessage() {
    setMessage('');
  }

  function uploadFile() {
    // setMessage('');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Button onClick={() => uploadFile()}>
        <AttachFileTwoToneIcon color='primary' />
      </Button>
      <TextField
        placeholder='Write message'
        fullWidth
        id='fullWidth'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />

      <Button onClick={() => sendMessage()}>
        <SendTwoToneIcon color='primary' />
      </Button>
    </Box>
  );
}
