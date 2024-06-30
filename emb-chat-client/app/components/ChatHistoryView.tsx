import { Box } from '@mui/material';
import React from 'react';
import ChatMessageRow from '@/app/components/ChatMessageRow';
import { useGlobalState } from '@/app/context/GlobalStateContext';

export default function ChatHistoryView() {
  const { state } = useGlobalState();
  const { sender, receiver, chatMessages } = state;

  function produceChatMessageView() {
    return chatMessages.map((message) => {
      const contentDirection =
        sender!.id == message.senderId ? 'flex-end' : 'flex-start';

      return (
        <Box
          key={message.id}
          sx={{
            justifyContent: contentDirection,
            alignSelf: contentDirection,
            width: '70%',
            boxSizing: 'border-box',
            marginBottom: '2%',
          }}
        >
          <ChatMessageRow
            ownMessage={sender!.id == message.senderId}
            message={message}
            sender={sender!}
            receiver={receiver!}
          />
        </Box>
      );
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
      {produceChatMessageView()}
    </Box>
  );
}
