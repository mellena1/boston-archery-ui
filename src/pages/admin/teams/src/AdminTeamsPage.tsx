import { useState } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { useTitle } from "react-use";

import { ColorRow } from "./ColorRow";
import { RequiredLabel } from "@/components/form";
import { TeamsSelect } from "@/components/teams-select";
import { type Team } from "@/models/team";

interface FormInput {
  name: string;
  teamColors: { val: string }[];
}

export function AdminTeamsPage() {
  useTitle("Admin - Teams");

  const { register, handleSubmit, control } = useForm<FormInput>();
  const {
    append,
    update,
    remove,
    fields: teamColors,
  } = useFieldArray({ name: "teamColors", control });

  const [selectedColorIdx, setSelectedColorIdx] = useState<number | undefined>(
    undefined,
  );

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);
  const isNewTeam = selectedTeam === undefined;

  const loading = false;

  return (
    <>
      <div className="flex justify-end">
        <div className="w-full md:w-1/4">
          <TeamsSelect
            showAddTeam={true}
            selectedTeamId={selectedTeam?.id}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
      </div>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <RequiredLabel
              htmlFor="name"
              value="Name"
              // color={error && newSeason.name === "" ? "failure" : undefined}
            />
            <TextInput
              id="name"
              type="text"
              {...register("name", { required: true })}
              // value={newSeason.name}
              // onInput={(v) => {
              //   setNewSeason({
              //     ...newSeason,
              //     name: v.currentTarget.value,
              //   });
              // }}
              // color={error && newSeason.name === "" ? "failure" : undefined}
            />
          </div>
        </div>
        <div className="pt-4">
          <div className="flex">
            <Label value="Team Colors" />
            <Button
              size="xs"
              className="ml-2"
              onClick={() => {
                append({ val: "#ff0000" });
              }}
            >
              <HiPlus />
            </Button>
          </div>
        </div>
        <div className="grid gap-2 pt-2">
          {teamColors.map((color, i) => (
            <ColorRow
              key={`color-${i}`}
              color={color.val}
              setColor={(newColor) => {
                update(i, { val: cleanHexCode(newColor) });
              }}
              onDelete={() => {
                remove(i);
              }}
              colorPickerHidden={selectedColorIdx !== i}
              onClick={() => {
                if (selectedColorIdx === i) {
                  setSelectedColorIdx(undefined);
                } else {
                  setSelectedColorIdx(i);
                }
              }}
              onClickAway={() => {
                if (selectedColorIdx === i) {
                  setSelectedColorIdx(undefined);
                }
              }}
            />
          ))}
        </div>
        <div className="pt-8 grid justify-items-center">
          <Button type="submit" disabled={loading}>
            {isNewTeam ? "Create New Team" : "Update Team"}
          </Button>
        </div>
      </form>
    </>
  );
}

const onSubmit: SubmitHandler<FormInput> = (input) => {
  console.log(input);
  return;
};

function cleanHexCode(s: string): string {
  let hex = s.replace("#", "").toLowerCase();
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((l) => l + l)
      .join("");
  }
  return `#${hex}`;
}
