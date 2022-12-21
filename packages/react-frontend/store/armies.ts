import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Army = {
  name: string;
  steps: string[];
};

type Armies = Record<string, Army>;

export type UnParsedArmy = {
  id: string;
  name: string;
  steps: string[];
};

interface State {
  armyIds: string[];
  setArmies: (armies: UnParsedArmy[]) => void;
  armies: Armies;
  getArmy: (id: string) => Army;
}

/*
[
    {
        "id": "6388dbbb74a6cc4991ea1323",
        "name": "testArny",
        "steps": []
    },
    {
        "id": "63a3244bdbbe967d2dfc3cf7",
        "name": "Kirk",
        "steps": []
    }
]
*/

const parseArmies = (armies: UnParsedArmy[]) => {
  const ids: string[] = [];
  const parsedArmies: Armies = {};
  armies.forEach((army) => {
    const { id, name, steps } = army;
    ids.push(id);
    parsedArmies[id] = { name, steps };
  });
  return { armyIds: ids, armies: parsedArmies };
};

export const useArmiesStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        armyIds: [],
        setArmies: (armies) =>
          set(
            () => ({
              armyIds: parseArmies(armies).armyIds,
            }),
            false,
            "set/armies"
          ),
        armies: {},
        getArmy: (id: string) => get().armies[id],
      }),
      {
        name: "armies-state",
      }
    )
  )
);
