import { useContext, useEffect, useState } from "react";

import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useTitle } from "react-use";

import { ErrorToast } from "@components/popups";

import { useAddSeason } from "@hooks/http";

import { Season } from "@models/season";

import { SeasonContext } from "@state/season";

import { ByeWeekRow } from "./ByeWeekRow";

const emptySeason = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  byeWeeks: [],
};

export function AdminSeasonsPage() {
  useTitle("Admin - Seasons");

  const { season } = useContext(SeasonContext);

  const [isNewSeason, setIsNewSeason] = useState<boolean>(true);
  const [newSeason, setNewSeason] = useState<Season>(emptySeason);

  useEffect(() => {
    if (season !== undefined) {
      setNewSeason(season);
      setIsNewSeason(false);
    } else {
      setIsNewSeason(true);
      setNewSeason(emptySeason);
    }
  }, [season]);

  const {
    loading: addLoading,
    error: addError,
    mutate: addNewSeason,
  } = useAddSeason();

  const loading = addLoading;
  const error = addError;

  return (
    <>
      {!loading && error && (
        <div className="pb-4">
          <ErrorToast>
            <span>
              <b>Error occured:</b> {error.message}
            </span>
          </ErrorToast>
        </div>
      )}
      <form
        onSubmit={(e) => {
          if (isNewSeason) {
            addNewSeason(newSeason);
          } else {
          }
          e.preventDefault();
        }}
      >
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
            <Datepicker
              id="startDate"
              required
              value={newSeason.startDate}
              onSelectedDateChanged={(d) => {
                setNewSeason({
                  ...newSeason,
                  startDate: d.toISOString().substring(0, 10),
                });
              }}
            />
          </div>
          <div className="row-start-2">
            <Label htmlFor="endDate" value="End Date" />
            <Datepicker
              id="endDate"
              required
              value={newSeason.endDate}
              onSelectedDateChanged={(d) => {
                setNewSeason({
                  ...newSeason,
                  endDate: d.toISOString().substring(0, 10),
                });
              }}
            />
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
                      byeWeeks: newSeason.byeWeeks?.filter(
                        (_, idx) => idx !== i,
                      ),
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="pt-8 grid justify-items-center">
          <Button type="submit">
            {isNewSeason ? "Create New Season" : "Update Season"}
          </Button>
        </div>
      </form>
    </>
  );
}
