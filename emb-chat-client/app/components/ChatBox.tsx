/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ChatHistoryView from '@/app/components/ChatHistoryView';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { ChatMessage, User } from '../models';

export default function ChatBox() {
  const { state, setState } = useGlobalState();
  const { sender, receiver, chatMessages } = state;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(10);

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
  }, [sender, receiver]);

  async function getChatHistory(sender: User, receiver: User) {
    const response = await fetch(
      `http://localhost:8080/api/v1/chats/senders/${sender.id}/receivers/${receiver?.id}?pageNumber=${pageNumber}&limit=${limit}`
    );
    var { histories }: { histories: ChatMessage[] } = await response.json();
    setState((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, ...histories],
    }));
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '',
        padding: '1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          maxHeight: '320px',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
        ref={chatContainerRef}
      >
        <ChatHistoryView />
      </Box>
    </Box>
  );
}
