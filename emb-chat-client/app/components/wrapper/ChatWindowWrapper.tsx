import { Box } from '@mui/material';
import React from 'react';
import HeaderMessage from '../header/HeaderMessage';
import WriteMessageBox from '../WriteMessageBox';
import useReadyToSendMesage from '@/app/hooks/useReadyToSendMesage';

export default function ChatWindowWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ready } = useReadyToSendMesage();

  return (
    <Box
      className='root-container'
      sx={{
        width: '100vw',
        height: '100vh',
        minWidth: '800px',
        backgroundColor: '#fdf7f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        className='chat-window-container'
        sx={{
          width: '380px',
          minWidth: '380px',
          height: '480px',
          backgroundColor: 'white',
          border: '2px solid #fff',
          boxShadow: '1px 0px 5px 0px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          className='chat-window-header'
          sx={{
            width: '100%',
            height: '15%',
            backgroundColor: '#f7f4f4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <HeaderMessage />
          </Box>
        </Box>
        <Box
          className='chat-box-container'
          sx={{
            width: '100%',
            height: '74%',
            maxHeight: '75%',
            backgroundColor: '#fff',
            overflowY: 'auto',
          }}
        >
          <Box>{children}</Box>
        </Box>
        {ready ? (
          <Box sx={{ height: '12%', backgroundColor: 'white' }}>
            <WriteMessageBox />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
