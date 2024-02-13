import { useDebouncedCallback, useSetAtom } from '@/hooks';
import { globalSearchAtom } from '@/lib/jotai';
import { Input } from '@/components/ui';

export const GlobalSearch = () => {
  const setGlobalSearch = useSetAtom(globalSearchAtom);

  const debounced = useDebouncedCallback(
    (v: string) => setGlobalSearch(v),
    300
  );

  return (
    <Input
      onChange={(e) => debounced(e.target.value)}
      placeholder="Type to search"
      size="sm"
    />
  );
};
