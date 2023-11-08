import { Season } from "@models/season";
import { createContext } from "react";

export const SeasonContext = createContext<{
  season: Season | undefined;
  setSeason: (season: Season | undefined) => void;
}>({
  season: undefined,
  setSeason: (_: Season | undefined) => {},
});
