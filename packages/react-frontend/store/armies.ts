import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Army = {
  name: string;
  fetched: boolean;
  steps: ArmySteps[];
};

type Armies = Record<string, Army>;

export type UnParsedArmy = {
  id: string;
  name: string;
};

export type ArmySteps = {
  id: string;
  name: string;
  rules: ArmyRule[];
};

export type ArmyRule = {
  id: string;
  name: string;
  text: string;
  iconUrl: string;
};

interface State {
  armyIds: string[];
  setArmies: (armies: UnParsedArmy[]) => void;
  updateArmySteps: (armyId: string, steps: ArmySteps[]) => void;
  armies: Armies;
  armiesFetched: boolean;
  getArmy: (id: string) => Army;
}

/*
[
    {
        "id": "6388dbbb74a6cc4991ea1323",
        "name": "testArny",
    },
    {
        "id": "63a3244bdbbe967d2dfc3cf7",
        "name": "Kirk",
    }
]
*/

const parseArmies = (armies: UnParsedArmy[]) => {
  const ids: string[] = [];
  const parsedArmies: Armies = {};
  armies.forEach((army) => {
    const { id, name } = army;
    ids.push(id);
    parsedArmies[id] = { name, fetched: false, steps: [] };
  });
  return { armyIds: ids, armies: parsedArmies };
};

export const useArmiesStore = create<State>()(
  devtools(
    (set, get) => ({
      armyIds: [],
      armiesFetched: false,
      setArmies: (armies) =>
        set(
          () => ({
            armyIds: parseArmies(armies).armyIds,
            armies: parseArmies(armies).armies,
            armiesFetched: true,
          }),
          false,
          "set/armies"
        ),
      updateArmySteps: (armyId, steps) =>
        set(
          (state: State) => {
            console.log(state);
            return {
              armies: {
                ...state.armies,
                [armyId]: {
                  ...state.armies[armyId],
                  fetched: true,
                  steps,
                },
              },
            };
          },
          false,
          "update/army"
        ),
      armies: {},
      getArmy: (id: string) => get().armies[id],
    }),
    {
      name: "armies-state",
    }
  )
);
