import { Button, Datepicker, type DatepickerProps } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

export type ByeWeekRowProps = {
  onDelete: () => void;
} & DatepickerProps;

export function ByeWeekRow(props: ByeWeekRowProps) {
  const { onDelete, ...dpProps } = props;
  return (
    <div className="flex">
      <div className="flex-1">
        <Datepicker {...dpProps} required />
      </div>
      <div className="ml-2">
        <Button onClick={onDelete} className="p-1">
          <HiTrash />
        </Button>
      </div>
    </div>
  );
}
