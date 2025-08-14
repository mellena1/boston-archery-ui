import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { HiCalendar as CalendarIcon, HiPlus } from "react-icons/hi";
import { useTitle } from "react-use";

import { ByeWeekRow } from "./ByeWeekRow";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RequiredLabel } from "@/components/form";
import { ErrorToast } from "@/components/popups";
import { SeasonsSelect } from "@/components/seasons-select";
import { useAddSeason, useGetSeasons, useUpdateSeason } from "@/hooks/http";
import { cn } from "@/lib/utils";
import { type Season } from "@/models/season";
import { SeasonContext } from "@/state/season";

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
              className={error && newSeason.name === "" ? "text-red-500" : ""}
            >
              Name
            </RequiredLabel>
            <Input
              id="name"
              type="text"
              value={newSeason.name}
              onInput={(v) => {
                setNewSeason({
                  ...newSeason,
                  name: v.currentTarget.value,
                });
              }}
              className={error && newSeason.name === "" ? "border-red-500" : ""}
            />
          </div>

          <div className="row-start-2">
            <RequiredLabel
              htmlFor="startDate"
              className={
                error && newSeason.startDate === "" ? "text-red-500" : ""
              }
            >
              Start Date
            </RequiredLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !newSeason.startDate && "text-muted-foreground",
                    error && newSeason.startDate === "" && "border-red-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newSeason.startDate ? (
                    format(newSeason.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(newSeason.startDate)}
                  onSelect={(d) =>
                    { setNewSeason({
                      ...newSeason,
                      startDate: d?.toISOString().substring(0, 10) ?? "",
                    }); }
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="row-start-2">
            <RequiredLabel
              htmlFor="endDate"
              className={
                error && newSeason.endDate === "" ? "text-red-500" : ""
              }
            >
              End Date
            </RequiredLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !newSeason.endDate && "text-muted-foreground",
                    error && newSeason.endDate === "" && "border-red-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newSeason.endDate ? (
                    format(newSeason.endDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(newSeason.endDate)}
                  onSelect={(d) =>
                    { setNewSeason({
                      ...newSeason,
                      endDate: d?.toISOString().substring(0, 10) ?? "",
                    }); }
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex">
            <Label>Bye Weeks</Label>
            <Button
              size="sm"
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
                  className={error && bye === "" ? "border-red-500" : ""}
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
