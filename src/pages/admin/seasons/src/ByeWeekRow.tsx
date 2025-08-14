import { format } from "date-fns";
import { HiCalendar as CalendarIcon, HiTrash } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ByeWeekRowProps {
  onDelete: () => void;
  onSelectedDateChanged: (d: Date) => void;
  value: string;
  className?: string;
}

export function ByeWeekRow(props: ByeWeekRowProps) {
  const { onDelete, onSelectedDateChanged, value, className } = props;
  return (
    <div className="flex">
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !value && "text-muted-foreground",
                className,
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(value)}
              onSelect={(d) => {
                onSelectedDateChanged(d ?? new Date());
              }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="ml-2">
        <Button onClick={onDelete} className="p-1">
          <HiTrash />
        </Button>
      </div>
    </div>
  );
}
