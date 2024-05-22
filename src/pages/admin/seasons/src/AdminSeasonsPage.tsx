import { useContext, useEffect, useState } from "react";

import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useTitle } from "react-use";

import { RequiredLabel } from "@components/form";
import { ErrorToast } from "@components/popups";
import { SeasonsSelect } from "@components/seasons-select";

import { useAddSeason, useGetSeasons, useUpdateSeason } from "@hooks/http";

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
  const { refetch: refetchSeasons } = useGetSeasons();

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
  } = useAddSeason({
    onSuccess: () => {
      setNewSeason(emptySeason);
      void refetchSeasons();
    },
  });

  const {
    loading: updateLoading,
    error: updateError,
    mutate: updateNewSeason,
  } = useUpdateSeason({
    onSuccess: () => {
      void refetchSeasons();
    },
  });

  const loading = addLoading || updateLoading;
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    setError(addError?.message ?? updateError?.message);
  }, [addError, updateError]);

  return (
    <>
      {!loading && error && (
        <div className="pb-4">
          <ErrorToast
            onDismiss={() => {
              setError(undefined);
            }}
          >
            <span>
              <b>Error occured:</b> {error}
            </span>
          </ErrorToast>
        </div>
      )}
      <div className="flex justify-end">
        <div className="w-full md:w-1/4">
          <SeasonsSelect showAddSeason={true} />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (newSeason.name === "") {
            setError("Must set name");
            return;
          }
          if (newSeason.name.length < 5) {
            setError("Name must be at least 5 characters long");
            return;
          }
          if (newSeason.startDate === "") {
            setError("Must set start date");
            return;
          }
          if (newSeason.endDate === "") {
            setError("Must set end date");
            return;
          }
          if (newSeason.byeWeeks?.some((v) => v === "")) {
            setError("All bye weeks must be set (or deleted)");
            return;
          }

          if (isNewSeason) {
            addNewSeason(newSeason);
          } else {
            updateNewSeason(newSeason);
          }
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <RequiredLabel
              htmlFor="name"
              value="Name"
              color={error && newSeason.name === "" ? "failure" : undefined}
            />
            <TextInput
              id="name"
              type="text"
              value={newSeason.name}
              onInput={(v) => {
                setNewSeason({
                  ...newSeason,
                  name: v.currentTarget.value,
                });
              }}
              color={error && newSeason.name === "" ? "failure" : undefined}
            />
          </div>

          <div className="row-start-2">
            <RequiredLabel
              htmlFor="startDate"
              value="Start Date"
              color={
                error && newSeason.startDate === "" ? "failure" : undefined
              }
            />
            <Datepicker
              id="startDate"
              value={newSeason.startDate}
              color={
                error && newSeason.startDate === "" ? "failure" : undefined
              }
              onSelectedDateChanged={(d) => {
                setNewSeason({
                  ...newSeason,
                  startDate: d.toISOString().substring(0, 10),
                });
              }}
              showClearButton={false}
              showTodayButton={false}
            />
          </div>
          <div className="row-start-2">
            <RequiredLabel
              htmlFor="endDate"
              value="End Date"
              color={error && newSeason.endDate === "" ? "failure" : undefined}
            />
            <Datepicker
              id="endDate"
              value={newSeason.endDate}
              color={error && newSeason.endDate === "" ? "failure" : undefined}
              onSelectedDateChanged={(d) => {
                setNewSeason({
                  ...newSeason,
                  endDate: d.toISOString().substring(0, 10),
                });
              }}
              showClearButton={false}
              showTodayButton={false}
            />
          </div>
        </div>
        <div className="pt-4">
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
                        idx === i ? d.toISOString().substring(0, 10) : v,
                      ),
                    });
                  }}
                  value={bye}
                  color={error && bye === "" ? "failure" : undefined}
                  showClearButton={false}
                  showTodayButton={false}
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
          <Button type="submit" disabled={loading}>
            {isNewSeason ? "Create New Season" : "Update Season"}
          </Button>
        </div>
      </form>
    </>
  );
}
