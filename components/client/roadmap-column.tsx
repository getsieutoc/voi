'use client';

import { queryStringify } from '@/lib/utils';
import { Separator } from '@/components/ui';
import { useAuth, useSWR } from '@/hooks';
import { PostWithPayload, Status } from '@/types';

import { QuickLookPost } from './quick-look-post';
import { ActionMenu } from './action-menu';
import { UpVote } from './up-vote';

export type RoadmapColumnProps = {
  status: Status;
};

export const RoadmapColumn = ({ status }: RoadmapColumnProps) => {
  const { session, isAdmin } = useAuth();

  const queryString = queryStringify({
    model: 'post',
    status,
  });

  const { data: posts, mutate } = useSWR<PostWithPayload[]>(
    `/api/search?${queryString}`
  );

  return (
    <div className="flex h-full flex-col rounded-md border">
      <h3 className="px-4 py-2 uppercase text-slate-400 dark:text-slate-600">
        {status}
      </h3>
      <Separator />

      <div className="flex h-full max-h-full flex-col gap-4 overflow-auto px-4 py-2">
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id} className="flex items-center gap-2">
                <UpVote postId={post.id} onFinish={mutate} />

                <div className="flex flex-auto flex-col">
                  <QuickLookPost post={post} />
                  <p className="line-clamp-1 text-sm font-light">
                    {post.description}
                  </p>
                </div>

                {(isAdmin || session?.user.id === post.userId) && (
                  <ActionMenu post={post} onFinish={mutate} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
