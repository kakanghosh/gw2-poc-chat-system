'use client';
import ChooseReceiverUser from '../components/getstarted/ChooseReceiverUser';
import ChatWindowWrapper from '../components/wrapper/ChatWindowWrapper';

export default function ChatAppReceiverWindow() {
  return (
    <ChatWindowWrapper>
      <ChooseReceiverUser />
    </ChatWindowWrapper>
  );
}
