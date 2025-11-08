import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';
import { SubmitHandler, Preferences } from '@/types';
import { User, Prisma } from '@/prisma/client/client';
import { updateUser } from '@/services/users';
import { useForm } from '@/hooks';

type ManualInputs = Partial<Preferences>;

export type NotificationsFormProps = {
  user: User;
};

export const NotificationsForm = ({ user }: NotificationsFormProps) => {
  const defaultValues: ManualInputs =
    user.preferences as Prisma.JsonObject as Preferences;

  const form = useForm<ManualInputs>({ defaultValues });

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    await updateUser(
      user.id,
      { preferences: input },
      {
        revalidatePath: '/profile',
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Notifications (Coming soon)</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              disabled
              control={form.control}
              name="notifyMe"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          All activities
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mine" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Only actions related to my posts
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nothing" />
                        </FormControl>
                        <FormLabel className="font-normal">Nothing</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 flex w-full justify-end gap-4">
            {form.formState.isDirty && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  form.reset();
                }}
                className="max-w-fit animate-fade-in duration-500"
                variant="ghost"
              >
                Reset
              </Button>
            )}

            <Button
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
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
