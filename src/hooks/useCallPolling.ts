import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCallPolling() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/call/current',
    fetcher,
    {
      refreshInterval: (data) => {
        // Stop polling if processing is completed or if there's an error
        if (!data || data.error || data.isPostProcessingCompleted) {
          return 0; // Stop polling
        }
        return 2000; // Poll every 2 seconds
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    call: data,
    isLoading,
    error,
    mutate,
    isProcessingCompleted: data?.isPostProcessingCompleted || false,
  };
}
