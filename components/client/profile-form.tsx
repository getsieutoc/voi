import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { User, SubmitHandler } from '@/types';
import { updateUser } from '@/services/users';
import { useForm } from '@/hooks';

type ManualInputs = {
  name: string;
  email: string;
  image: string;
};

export type ProfileFormProps = {
  user: User;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const defaultValues: ManualInputs = {
    name: user.name ?? '',
    email: user.email ?? '',
    image: user.image ?? '',
  };

  const form = useForm<ManualInputs>({ defaultValues });

  const {
    formState: { isDirty, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    await updateUser(user.id, input, {
      revalidatePath: '/profile',
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Profile</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 flex w-full justify-end gap-4">
            {isDirty && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  form.reset(defaultValues);
                }}
                className="max-w-fit animate-fade-in duration-500"
                variant="ghost"
              >
                Reset
              </Button>
            )}

            <Button
              disabled={isSubmitting || !isDirty}
              className="max-w-fit"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
