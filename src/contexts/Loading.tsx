import { createContext, useContext, useState } from 'react';
import { LoadingContextType } from '../types';

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);

const useLoading = () => useContext(LoadingContext);

function LoadingProvider(props: React.PropsWithChildren<unknown>) {
  const [loadingData, setLoadingData] = useState({ loading: 'idle' as ('idle' | 'loading' | 'failed') });

  return (
    <LoadingContext.Provider
      value={{ loadingData, setLoadingData }}
      {...props}
    />
  );
}

export { useLoading, LoadingProvider };