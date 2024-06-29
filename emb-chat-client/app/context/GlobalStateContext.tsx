'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage, Kingdom, User, WelcomeMessage } from '../models';

export interface StateDef {
  message: WelcomeMessage;
  users: User[];
  kingdoms: Kingdom[];
  sender?: User;
  receiver?: User;
  chatMessages: ChatMessage[];
}

interface GlobalStateContextProps {
  state: StateDef;
  setState: React.Dispatch<React.SetStateAction<StateDef>>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
  undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateDef>({
    users: [],
    message: new WelcomeMessage(
      'Greetings, Brave Adventurers of',
      'We are thrilled to announce that your latest quest has been a resounding success'
    ),
    kingdoms: [],
    chatMessages: [],
  });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
