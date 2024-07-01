'use client';
import ChatBox from '@/app/components/ChatBox';
import { useGlobalState } from '@/app/context/GlobalStateContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatWindowWrapper from '../components/wrapper/ChatWindowWrapper';

export default function ChatWindow() {
  const { state, setState } = useGlobalState();
  const router = useRouter();
  const { sender, receiver } = state;

  useEffect(() => {
    if (!sender) {
      router.push('/');
    }
  }, [sender, router]);

  return (
    <ChatWindowWrapper>
      <ChatBox />
    </ChatWindowWrapper>
  );
}
