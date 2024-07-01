/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function WriteMessageBox() {
  const { state, setState } = useGlobalState();
  const { stompClient, sender, receiver } = state;
  const [message, setMessage] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/files/senders/${sender?.id}/receivers/${receiver?.id}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload(selectedFile);
      setSelectedFile(null);
    }
  }, [selectedFile]);

  function sendMessage() {
    if (stompClient && sender && receiver) {
      stompClient.publish({
        destination: `/app/chat/${sender?.id}`,
        body: JSON.stringify({ receiverId: receiver?.id, content: message }),
      });
    }
    setMessage('');
  }

  function uploadFile() {
    // setMessage('');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        justifyItems: 'space-between',
      }}
    >
      <Button
        component='label'
        role={undefined}
        variant='outlined'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        <VisuallyHiddenInput onChange={handleFileChange} type='file' />
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
