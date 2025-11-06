import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
} from '@/components/ui';
import { useDisclosure, useLoading, useSWRConfig } from '@/hooks';
import { deletePost } from '@/services/posts';
import { queryStringify } from '@/lib/utils';
import { Trash2 } from '@/components/icons';
import { Post } from '@/prisma/client/client';

export const DeletePostDialog = ({
  post,
  onFinish,
}: {
  post: Post;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { mutate } = useSWRConfig();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onDelete = async (id: string) => {
    startLoading();

    const result = await deletePost(id);

    const queryString = queryStringify({
      model: 'post',
      status: post.status,
    });

    mutate(`/api/search?${queryString}`);

    if (result) {
      stopLoading();
      onFinish?.(post.id);
    }

    onClose();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <Trash2 className="h-4 w-4" /> Delete post
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader className="text-red-500">
          <DialogTitle>Delete post: {post.title}</DialogTitle>
        </DialogHeader>

        <div className="text-red-500">
          <h2>Are you sure?</h2>
          <p>This action can not undo!</p>
        </div>

        <DialogFooter className="mt-6 w-full justify-between">
          <Button
            onClick={() => handleOpenChange(false)}
            className="max-w-fit"
            variant="ghost"
          >
            Cancel
          </Button>

          <Button
            className="max-w-fit bg-red-500 hover:bg-red-600 dark:hover:bg-red-400"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => onDelete(post.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
