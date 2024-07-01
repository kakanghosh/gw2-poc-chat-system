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
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasNext, setHasNext] = useState(false);
  const gotoTop = useRef(true);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && gotoTop.current) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    if (!gotoTop.current) {
      gotoTop.current = true;
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
    var { histories, total }: { histories: ChatMessage[]; total: number } =
      await response.json();

    setHasNext(pageNumber < total);

    setState((prev) => {
      const messages = [...prev.chatMessages, ...histories];
      const uniqueArray: ChatMessage[] = [];
      const set = new Set();
      for (let message of messages) {
        if (!set.has(message.id)) {
          uniqueArray.push(message);
          set.add(message.id);
        }
      }
      return {
        ...prev,
        chatMessages: uniqueArray,
      };
    });

    setPageNumber((prev) => pageNumber + 1);
  }

  async function loadMoreMessage() {
    if (sender && receiver) {
      gotoTop.current = false;
      getChatHistory(sender, receiver);
    }
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
        <ChatHistoryView hasNext={hasNext} loadMoreMessage={loadMoreMessage} />
      </Box>
    </Box>
  );
}
