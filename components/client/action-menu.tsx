import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoreHorizontal, ClipboardCopy } from '@/components/icons';
import { PostWithPayload } from '@/types';
import { useDisclosure } from '@/hooks';

import { EditPostDialog } from './edit-post-dialog';
import { DeletePostDialog } from './delete-post-dialog';

type ActionMenuProps = {
  post: PostWithPayload;
  onFinish: () => void;
};

export const ActionMenu = ({ post, onFinish }: ActionMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onFinish();
      onClose();
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(post.id)}
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy post ID
        </DropdownMenuItem>

        <EditPostDialog post={post} onFinish={() => handleOpenChange(false)} />

        <DeletePostDialog post={post} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
