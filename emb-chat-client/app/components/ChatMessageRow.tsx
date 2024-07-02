import { Avatar, Box, Chip } from '@mui/material';
import React from 'react';
import { ChatMessage, User } from '../models';
import Link from 'next/link';

export default function ChatMessageRow({
  start,
  message,
  ownMessage,
  sender,
  receiver,
}: {
  start: boolean;
  message: ChatMessage;
  ownMessage: boolean;
  sender: User;
  receiver: User;
}) {
  const othersMessage = !ownMessage;
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

  function showAvater(own: boolean) {
    return (
      <Avatar alt={own ? sender.firstName : receiver.firstName}>
        {own ? sender.firstName.charAt(0) : receiver.firstName.charAt(0)}
      </Avatar>
    );
  }

  function showMessageContent() {
    const { file } = message;
    if (file) {
      const fileLink = `${BASE_API_URL}/api/v1/files/${file.id}`;
      const linkUi = (
        <Link href={fileLink} target='_blank'>
          {file.fileName}
        </Link>
      );
      return <Box>{linkUi}</Box>;
    }
    return `${message.content}`;
  }
  return (
    <Box
      sx={{
        marginBottom: '10px',
        display: 'flex',
        justifyContent: start ? 'flex-start' : 'flex-end',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {othersMessage ? showAvater(false) : <></>}
        <Chip
          sx={{
            height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            },
          }}
          label={showMessageContent()}
        />
        {ownMessage ? showAvater(true) : <></>}
      </Box>
    </Box>
  );
}
