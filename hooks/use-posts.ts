import { PostWithPayload } from '@/types';
import { Status } from '@/prisma/client/client';
import { globalSearchAtom } from '@/lib/jotai';
import { queryStringify } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';

export const usePosts = (status?: Status) => {
  const search = useAtomValue(globalSearchAtom);

  const queryString = queryStringify({
    search: search ? search : undefined,
    model: 'post',
    status,
  });

  const { data: posts, ...rest } = useSWR<PostWithPayload[]>(
    status ? `/api/search?${queryString}` : null,
    { keepPreviousData: true }
  );

  return { posts, ...rest };
};
