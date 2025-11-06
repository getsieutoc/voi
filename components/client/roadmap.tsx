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

        {/* <Popover> */}
        {/*   <PopoverTrigger asChild> */}
        {/*     <Button disabled size="sm" variant="outline"> */}
        {/*       <Filter className="h-4" /> */}
        {/*       Filter */}
        {/*     </Button> */}
        {/*   </PopoverTrigger> */}
        {/*   <PopoverContent side="left" align="start" className="text-sm"> */}
        {/*     Filter is under construction */}
        {/*   </PopoverContent> */}
        {/* </Popover> */}
      </div>

      <div className="grid h-full grid-cols-3 gap-4">
        {[Status.REVIEW, Status.PLANNED, Status.IN_PROGRESS].map((status) => (
          <RoadmapColumn key={status} status={status} />
        ))}
      </div>
    </div>
  );
};
