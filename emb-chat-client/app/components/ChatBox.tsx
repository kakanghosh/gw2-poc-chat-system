import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import ChatHistoryView from '@/app/components/ChatHistoryView';
import WriteMessageBox from '@/app/components/WriteMessageBox';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { ChatMessage, User } from '../models';

export default function ChatBox() {
  const { state, setState } = useGlobalState();
  const { sender, receiver, chatMessages } = state;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (sender && receiver) {
      getChatHistory(sender, receiver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sender, receiver]);

  async function getChatHistory(sender: User, receiver: User) {
    const response = await fetch(
      `http://localhost:8080/api/v1/chats/senders/${sender.id}/receivers/${receiver?.id}?pageNumber=0&limit=10`
    );
    var { histories }: { histories: ChatMessage[] } = await response.json();
    setState((prev) => ({
      ...prev,
      chatMessages: [...histories],
    }));
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '',
        height: '85vh',
        padding: '1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          height: '90%',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
        ref={chatContainerRef}
      >
        <ChatHistoryView />
      </Box>
      <Box sx={{ height: '10%', backgroundColor: 'white' }}>
        <WriteMessageBox />
      </Box>
    </Box>
  );
}
