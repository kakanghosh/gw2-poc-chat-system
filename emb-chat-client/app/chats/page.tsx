'use client';
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar';
import ChatBox from '@/app/components/ChatBox';
import UsersBox from '@/app/components/UsersBox';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { ChatMessage, UserStatus } from '../models';

export default function ChatWindow() {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const { sender, receiver } = state;
  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    if (sender) {
      const client = new Client({
        brokerURL: 'ws://localhost:8080/message-bridge',
        onConnect: () => {
          setState((prev) => ({
            ...prev,
            stompClient: client,
          }));

          client.subscribe(`/emb-topic/status/${sender.id}`, (message) => {
            const userStatus: UserStatus = JSON.parse(message.body);
            setState((prev) => {
              const onlinedUser = prev.users.find(
                (user) => user.id == userStatus.userId
              );
              if (onlinedUser) {
                onlinedUser.onlineStatus = userStatus.status;
              }
              return {
                ...prev,
                users: [...prev.users],
              };
            });
          });

          client.subscribe(`/emb-topic/chat/${sender.id}`, (message) => {
            const chatMessage: ChatMessage = JSON.parse(message.body);
            setState((prev) => ({
              ...prev,
              chatMessages: [chatMessage, ...prev.chatMessages],
            }));
          });

          client.publish({
            destination: `/app/status/${sender.id}/online`,
          });
        },
      });
      client.activate();
      return () => {
        client.deactivate();
        setState((prev) => ({ ...prev, stompClient: null }));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sender]);

  useEffect(() => {
    if (!sender) {
      router.push('/');
    }
  }, [sender, router]);

  useEffect(() => {
    if (sender && receiver) {
      setShowChatBox(true);
    }
  }, [sender, receiver]);

  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UsersBox />
          </Grid>
          <Grid item xs={8}>
            {showChatBox ? (
              <ChatBox />
            ) : (
              <Box>Select user to start messaging</Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
