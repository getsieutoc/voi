import { useState } from 'react';

export const useLoading = (init?: boolean) => {
  const [isLoading, setLoading] = useState(!!init);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return {
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
  };
};
