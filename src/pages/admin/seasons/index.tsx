import { Season } from "@models/season";
import { SeasonContext } from "@state/season";
import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { HiPlus, HiPlusCircle } from "react-icons/hi";
import { ByeWeekRow } from "./ByeWeekRow";

export function AdminSeasons() {
  const { season, setSeason } = useContext(SeasonContext);

  const [newSeason, setNewSeason] = useState<Season>({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    byeWeeks: [],
  });

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            required
            value={newSeason.name}
            onInput={(v) => {
              setNewSeason({
                ...newSeason,
                name: v.currentTarget.value,
              });
            }}
          />
        </div>

        <div className="row-start-2">
          <Label htmlFor="startDate" value="Start Date" />
          <Datepicker id="startDate" required value={newSeason.startDate} />
        </div>
        <div className="row-start-2">
          <Label htmlFor="endDate" value="End Date" />
          <Datepicker id="endDate" required value={newSeason.endDate} />
        </div>
      </div>
      <div className="pt-2">
        <div className="flex">
          <Label value="Bye Weeks" />
          <Button
            size="xs"
            className="ml-2"
            onClick={() => {
              setNewSeason({
                ...newSeason,
                byeWeeks: [...(newSeason.byeWeeks ?? []), ""],
              });
            }}
          >
            <HiPlus />
          </Button>
        </div>
        <div className="grid gap-2 pt-2">
          {newSeason.byeWeeks?.map((bye, i) => {
            return (
              <ByeWeekRow
                key={`bye-${i}`}
                onSelectedDateChanged={(d: Date) => {
                  setNewSeason({
                    ...newSeason,
                    byeWeeks: newSeason.byeWeeks?.map((v, idx) =>
                      idx === i ? d.toDateString() : v,
                    ),
                  });
                }}
                value={bye}
                onDelete={() => {
                  setNewSeason({
                    ...newSeason,
                    byeWeeks: newSeason.byeWeeks?.filter((_, idx) => idx !== i),
                  });
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="pt-8 grid justify-items-center">
        <Button type="submit">Create New Season</Button>
      </div>
    </form>
  );
}
