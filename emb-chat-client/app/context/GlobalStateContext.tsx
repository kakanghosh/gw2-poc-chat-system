'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Kingdom, User, WelcomeMessage } from '../models';

export interface StateDef {
  message: WelcomeMessage;
  users: User[];
  kingdoms: Kingdom[];
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
    users: [new User(new Kingdom(1, 'ABC'), 1, 'Kakan', 'Ghosh', false)],
    message: new WelcomeMessage(
      'Greetings, Brave Adventurers of Luminara and Nocturna',
      'We are thrilled to announce that your latest quest has been a resounding success'
    ),
    kingdoms: [],
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
