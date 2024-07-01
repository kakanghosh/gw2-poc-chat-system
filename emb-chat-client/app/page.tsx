/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import ChooseStartUser from './components/getstarted/ChooseStartUser';
import ChatWindowWrapper from './components/wrapper/ChatWindowWrapper';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { Client } from '@stomp/stompjs';
import { ChatMessage, UserStatus } from './models';

export default function ChatAppSenderWindow() {
  const { state, setState } = useGlobalState();
  const { sender, receiver, stompClient } = state;

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
              // console.log(userStatus);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sender]);

  useEffect(() => {
    if (!sender && stompClient) {
      console.log('disconnect socket');

      stompClient.deactivate();
      setState((prev) => ({ ...prev, stompClient: null }));
    }
  }, [sender, stompClient]);

  return (
    <ChatWindowWrapper>
      <ChooseStartUser />
    </ChatWindowWrapper>
  );
}
