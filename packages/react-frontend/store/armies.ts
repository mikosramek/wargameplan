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
  updateCurrentArmySteps: (steps: ArmySteps[]) => void;
  armies: Armies;
  armiesFetched: boolean;
  getArmy: (id: string) => Army;
  currentArmyId: string | null;
  setCurrentArmyId: (id: string) => void;
  currentStepId: string | null;
  setCurrentStepId: (id: string) => void;
  clearCurrentArmyId: () => void;
}

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
      updateCurrentArmySteps: (steps) =>
        set((state: State) => {
          const currentArmyId = state.currentArmyId;
          if (!currentArmyId) return state;
          return {
            armies: {
              ...state.armies,
              [currentArmyId]: {
                ...state.armies[currentArmyId],
                steps,
              },
            },
          };
        }),
      armies: {},
      getArmy: (id: string) => get().armies[id],
      currentArmyId: null,
      setCurrentArmyId: (id: string) =>
        set(() => ({ currentArmyId: id }), false, "set/armyId"),
      currentStepId: null,
      setCurrentStepId: (id: string) =>
        set(() => ({ currentStepId: id }), false, "set/stepId"),
      clearCurrentArmyId: () =>
        set(
          () => ({ currentStepId: null, currentArmyId: null }),
          false,
          "clear/army"
        ),
    }),
    {
      name: "armies-state",
    }
  )
);
