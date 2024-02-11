import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { Post, PostWithPayload, SubmitHandler, Status } from '@/types';
import { useDisclosure, useForm, useSWRConfig } from '@/hooks';
import { updatePost } from '@/services/posts';
import { queryStringify } from '@/lib/utils';
import { Pencil } from '@/components/icons';

type ManualInputs = Partial<Post>;

export const EditPostDialog = ({
  post,
  onFinish,
}: {
  post: PostWithPayload;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate } = useSWRConfig();

  const form = useForm<ManualInputs>({ defaultValues: post });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    const result = await updatePost(post.id, {
      title: input.title,
      description: input.description,
      status: input.status,
    });

    if (result) {
      onFinish?.(post.id);
    }

    const queryString = queryStringify({
      model: 'post',
      status: input.status,
    });

    mutate(`/api/search?${queryString}`);

    handleOpenChange(false);
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
          <Pencil className="h-4 w-4" /> Edit job
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(Status).map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                className="max-w-fit"
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
