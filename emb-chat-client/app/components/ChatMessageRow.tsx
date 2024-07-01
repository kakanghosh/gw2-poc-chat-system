import { Box, Chip } from '@mui/material';
import React from 'react';
import { ChatMessage, User } from '../models';
import Link from 'next/link';

export default function ChatMessageRow({
  message,
  ownMessage,
  sender,
  receiver,
}: {
  message: ChatMessage;
  ownMessage: boolean;
  sender: User;
  receiver: User;
}) {
  const othersMessage = !ownMessage;

  function showMessageContent() {
    const { file } = message;
    if (file) {
      const fileLink = `http://localhost:8080/api/v1/files/${file.id}`;
      const linkUi = (
        <Link href={fileLink} target='_blank'>
          {file.fileName}
        </Link>
      );
      if (othersMessage) {
        return (
          <Box sx={{ display: 'flex' }}>
            <Box>[{receiver.firstName}]- </Box>
            <Box>{linkUi}</Box>
          </Box>
        );
      } else {
        return <Box>{linkUi}</Box>;
      }
    }
    if (othersMessage) {
      return `[${receiver.firstName}] -  ${message.content}`;
    }
    return `${message.content}`;
  }
  return (
    <Box>
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
    </Box>
  );
}
