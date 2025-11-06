import { Status } from '@/prisma/client/enums';

import { RoadmapColumn } from './roadmap-column';
import { GlobalSearch } from './global-search';

export const Roadmap = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="max-w-[300px] flex-auto">
          <GlobalSearch />
        </div>
      </div>

      <div className="grid h-full grid-cols-3 gap-4">
        {[Status.REVIEW, Status.PLANNED, Status.IN_PROGRESS].map((status) => (
          <RoadmapColumn key={status} status={status} />
        ))}
      </div>
    </div>
  );
};
