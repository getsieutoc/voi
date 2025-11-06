'use client';

import { useEffect, useRef, useState } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useAuth, usePosts } from '@/hooks';
import { useSWRConfig } from 'swr';
import { Separator } from '@/components/ui';
import { Status } from '@/prisma/client/enums';
import { toast } from 'sonner';
import { updatePostStatus } from '@/services/posts';

import { DraggablePost } from './draggable-post';

export type RoadmapColumnProps = {
  status: Status;
};

export const RoadmapColumn = ({ status }: RoadmapColumnProps) => {
  const { user, isAdmin } = useAuth();
  const { posts } = usePosts(status);
  const { mutate: globalMutate } = useSWRConfig();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const element = dropRef.current;

    if (!element || !isAdmin) {
      return;
    }

    return dropTargetForElements({
      element,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: async ({ source }) => {
        setIsDraggedOver(false);

        const data = source.data as {
          postId: string;
          currentStatus: Status;
        };

        // Don't update if dropping in the same column
        if (data.currentStatus === status) {
          return;
        }

        try {
          await updatePostStatus(data.postId, status);
          // Invalidate cache for all columns to remove ghost items
          globalMutate(
            (key) => typeof key === 'string' && key.startsWith('/api/search?'),
            undefined,
            { revalidate: true }
          );
          toast.success('Post status updated successfully');
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : 'Failed to update post'
          );
        }
      },
    });
  }, [status, isAdmin, globalMutate]);

  return (
    <div className="flex h-full flex-col rounded-md border">
      <h3 className="px-4 py-2 uppercase text-slate-400 dark:text-slate-600">
        {status}
      </h3>
      <Separator />

      <div
        ref={dropRef}
        className={`flex h-full max-h-full flex-col gap-4 overflow-auto px-4 py-2 ${
          isDraggedOver ? 'bg-slate-100 dark:bg-slate-800' : ''
        }`}
      >
        {posts &&
          posts.map((post) => {
            return (
              <DraggablePost
                key={post.id}
                post={post}
                isAdmin={isAdmin}
                userId={user?.id}
                onFinish={() =>
                  globalMutate(
                    (key) =>
                      typeof key === 'string' && key.startsWith('/api/search?')
                  )
                }
              />
            );
          })}
      </div>
    </div>
  );
};
