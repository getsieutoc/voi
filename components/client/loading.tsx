import { Spinner } from '@/components/ui';

export const PageLoading = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
};
