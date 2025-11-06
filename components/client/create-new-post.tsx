'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui';
import { useAuth, useDisclosure, useForm, usePosts } from '@/hooks';
import { Status, Post, SubmitHandler } from '@/types';
import { createPost } from '@/services/posts';
import { Plus } from '@/components/icons';

const defaultValues = {
  title: '',
  description: '',
  status: Status.REVIEW,
} satisfies Partial<Post>;

type Inputs = typeof defaultValues;

export const CreateNewPostButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();

  const { mutate } = usePosts(Status.REVIEW);

  const form = useForm<Inputs>({ defaultValues });

  const handleOpenChange = (isOpen: boolean) => {
    form.reset();

    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const isDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (!user) return;

    const result = await createPost({
      data: {
        ...input,
        user: {
          connect: { id: user.id },
        },
      },
    });

    if (result) {
      mutate();
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={onOpen}>
          <Plus className="mr-4 h-4 w-4" />
          Add New Feedback
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => {
          if (form.formState.isSubmitting || !form.formState.isDirty) {
            e.preventDefault();
            return;
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Short title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Post description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-6 w-full justify-between">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenChange(false);
                }}
                className="max-w-fit"
                variant="ghost"
              >
                Cancel
              </Button>

              <Button
                isLoading={form.formState.isSubmitting}
                disabled={isDisabled}
                className="max-w-fit"
                type="submit"
              >
                Add to review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
