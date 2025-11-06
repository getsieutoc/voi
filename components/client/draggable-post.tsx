'use client';

import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Status } from '@/prisma/client/enums';
import { PostWithPayload } from '@/types';

import { QuickLookPost } from './quick-look-post';
import { ActionMenu } from './action-menu';
import { UpVote } from './up-vote';

export type DraggablePostProps = {
  post: PostWithPayload;
  isAdmin: boolean;
  userId?: string;
  onFinish: () => void;
};

export const DraggablePost = ({
  post,
  isAdmin,
  userId,
  onFinish,
}: DraggablePostProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || !isAdmin) {
      return;
    }

    return draggable({
      element,
      getInitialData: () => ({
        postId: post.id,
        currentStatus: post.status,
      }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [post.id, post.status, isAdmin]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${
        isAdmin ? 'cursor-grab active:cursor-grabbing' : ''
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <UpVote postId={post.id} value={post._count.votes} onFinish={onFinish} />

      <div className="flex flex-auto flex-col">
        <QuickLookPost post={post} />
        <p className="line-clamp-1 text-sm font-light">{post.description}</p>
      </div>

      {(isAdmin || userId === post.userId) && (
        <ActionMenu post={post} onFinish={onFinish} />
      )}
    </div>
  );
};

