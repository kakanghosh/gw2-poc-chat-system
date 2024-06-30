import { Box, Chip, Link } from '@mui/material';
import React from 'react';
import { ChatMessage, User } from '../models';

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
      return (
        <Link href={file.filePath} underline='none'>
          {file.fileName}
        </Link>
      );
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
