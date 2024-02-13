'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { PostWithPayload } from '@/types';
import { useDisclosure } from '@/hooks';
import { formatTime } from '@/lib/utils';

export type QuickLookPostProps = {
  post: PostWithPayload;
};

export const QuickLookPost = ({ post }: QuickLookPostProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <h3 className="text-md line-clamp-2 font-medium hover:cursor-pointer hover:text-sky-400 dark:hover:text-sky-600">
          {post.title}
        </h3>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Post Quick Look</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              Posted at: {formatTime(post.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>{post.description}</CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <p>Author: {post.user.name ?? post.user.email}</p>
          </CardFooter>
        </Card>

        <DialogFooter className="w-full justify-between">
          <Button
            onClick={() => handleOpenChange(false)}
            className="max-w-fit"
            variant="ghost"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
