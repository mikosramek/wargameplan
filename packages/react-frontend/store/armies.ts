import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Army = {
  name: string;
  fetched: boolean;
  steps: Record<string, ArmySteps>;
};

type Armies = Record<string, Army>;

export type UnParsedArmy = {
  id: string;
  name: string;
};

export type ArmySteps = {
  id: string;
  name: string;
  order: number;
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
  updateArmySteps: (armyId: string, steps: Record<string, ArmySteps>) => void;
  updateCurrentArmyStep: (stepId: string, steps: ArmySteps) => void;
  updateCurrentArmyStepRule: (stepId: string, rules: ArmyRule[]) => void;
  armies: Armies;
  armiesFetched: boolean;
  getArmy: (id: string) => Army;
  getArmySteps: (id: string) => ArmySteps[];
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
    parsedArmies[id] = { name, fetched: false, steps: {} };
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
      updateCurrentArmyStep: (stepId, step) =>
        set((state: State) => {
          const currentArmyId = state.currentArmyId;
          if (!currentArmyId) return state;
          const currentArmy = state.armies[currentArmyId];
          return {
            armies: {
              ...state.armies,
              [currentArmyId]: {
                ...currentArmy,
                steps: {
                  ...currentArmy.steps,
                  [stepId]: step,
                },
              },
            },
          };
        }),
      updateCurrentArmyStepRule: (stepId, rules) => {
        set((state: State) => {
          const currentArmyId = state.currentArmyId;
          if (!currentArmyId) return state;
          const currentArmy = state.armies[currentArmyId];
          return {
            armies: {
              ...state.armies,
              [currentArmyId]: {
                ...currentArmy,
                steps: {
                  ...currentArmy.steps,
                  [stepId]: {
                    ...currentArmy.steps[stepId],
                    rules,
                  },
                },
              },
            },
          };
        });
      },
      armies: {},
      getArmy: (id: string) => get().armies[id],
      getArmySteps: (id: string) => {
        const armies = get().armies;
        if (!armies[id]) return [];
        return Object.values(armies[id].steps);
      },
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
