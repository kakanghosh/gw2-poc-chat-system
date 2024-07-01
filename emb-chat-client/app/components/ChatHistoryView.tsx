import { Box, Button } from '@mui/material';
import React from 'react';
import ChatMessageRow from '@/app/components/ChatMessageRow';
import { useGlobalState } from '@/app/context/GlobalStateContext';

export default function ChatHistoryView({
  hasNext,
  loadMoreMessage,
}: {
  hasNext: boolean;
  loadMoreMessage: () => void;
}) {
  const { state } = useGlobalState();
  const { sender, receiver, chatMessages } = state;

  function produceChatMessageView() {
    if (!sender) return;
    return chatMessages.map((message) => {
      return (
        <ChatMessageRow
          key={message.id}
          start={sender!.id != message.senderId}
          ownMessage={sender!.id == message.senderId}
          message={message}
          sender={sender!}
          receiver={receiver!}
        />
      );
    });
  }

  return (
    <Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}
      >
        {hasNext ? (
          <Button onClick={() => loadMoreMessage()} variant='text'>
            Load more...
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <Box
        className={'history--main--div'}
        sx={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        {produceChatMessageView()}
      </Box>
    </Box>
  );
}
