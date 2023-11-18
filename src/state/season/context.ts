import { createContext } from "react";

import { Season } from "@models/season";

export const SeasonContext = createContext<{
  season: Season | undefined;
  setSeason: (season: Season | undefined) => void;
}>({
  season: undefined,
  setSeason: (_: Season | undefined) => {},
});
