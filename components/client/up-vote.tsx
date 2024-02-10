import { ChevronUp } from '@/components/icons';
import { createVote } from '@/services/votes';
import { useAuth, useSWR } from '@/hooks';
import { Skeleton } from '@/components/ui';

export type UpVoteProps = {
  postId: string;
  onFinish: () => void;
};

export const UpVote = ({ postId, onFinish }: UpVoteProps) => {
  const { session } = useAuth();

  const {
    data: count,
    mutate,
    isLoading,
  } = useSWR<number>(`/api/votes/count?postId=${postId}`);

  const handleUpVote = async () => {
    if (!session) return;

    await createVote({
      data: {
        user: { connect: { id: session.user.id } },
        post: { connect: { id: postId } },
      },
    });

    mutate();

    onFinish();
  };

  return (
    <div
      onClick={handleUpVote}
      className="flex min-w-12 flex-col items-center justify-center rounded-md border px-3 py-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
    >
      <ChevronUp className="h-4 w-4" />
      {count === undefined || isLoading ? (
        <Skeleton className="h-5 w-4" />
      ) : (
        <p className="select-none">{count}</p>
      )}
    </div>
  );
};
