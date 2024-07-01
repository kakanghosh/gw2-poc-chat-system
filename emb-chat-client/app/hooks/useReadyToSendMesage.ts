import { useGlobalState } from '@/app/context/GlobalStateContext';
import { useEffect, useState } from 'react';

export default function useReadyToSendMesage() {
  const { state, setState } = useGlobalState();
  const { sender, receiver } = state;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sender && receiver) {
      setReady(true);
    }
    return () => {
      setReady(false);
    };
  }, [sender, receiver]);

  return { ready };
}
