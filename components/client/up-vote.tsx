import { ChevronUp } from '@/components/icons';
import { createVote } from '@/services/votes';
import { useAuth } from '@/hooks';
import { Skeleton } from '@/components/ui';

export type UpVoteProps = {
  postId: string;
  value?: number;
  onFinish: () => void;
};

export const UpVote = ({ postId, value, onFinish }: UpVoteProps) => {
  const { user } = useAuth();

  const handleUpVote = async () => {
    if (!user) return;

    await createVote({
      data: {
        user: { connect: { id: user.id } },
        post: { connect: { id: postId } },
      },
    });

    onFinish();
  };

  return (
    <div
      onClick={handleUpVote}
      className="flex min-w-12 flex-col items-center justify-center rounded-md border px-3 py-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
    >
      <ChevronUp className="h-4 w-4" />
      {value === undefined ? (
        <Skeleton className="h-5 w-4" />
      ) : (
        <p className="select-none">{value}</p>
      )}
    </div>
  );
};
