import { reorderStepResponse } from "hooks/useApi";
import { cloneDeep } from "lodash";
import create from "zustand";
import { devtools } from "zustand/middleware";

export type Army = {
  name: string;
  fetched: boolean;
  steps: Record<string, ArmySteps>;
};

export type Armies = Record<string, Army>;

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
  addArmy: (army: UnParsedArmy) => void;
  removeArmy: (armyId: string) => void;
  updateArmySteps: (armyId: string, steps: Record<string, ArmySteps>) => void;
  updateArmyStepOrder: (update: reorderStepResponse) => void;
  updateCurrentArmyStep: (stepId: string, steps: ArmySteps) => void;
  updateCurrentArmyStepRule: (stepId: string, rules: ArmyRule[]) => void;
  removeCurrentArmyStep: (stepId: string) => void;
  armies: Armies;
  armiesFetched: boolean;
  fetchedArmyIds: string[];
  getHasArmyBeenFetched: (id: string) => boolean;
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
      fetchedArmyIds: [],
      getHasArmyBeenFetched: (id) => !!get().fetchedArmyIds.includes(id),
      setArmies: (armies) =>
        set(
          () => {
            const parsedArmies = parseArmies(armies);
            return {
              armyIds: parsedArmies.armyIds,
              armies: parsedArmies.armies,
              armiesFetched: true,
            };
          },
          false,
          "set/armies"
        ),
      addArmy: (army) =>
        set(
          (state: State) => {
            const parsedArmy = parseArmies([army]);
            return {
              armyIds: [...state.fetchedArmyIds, ...parsedArmy.armyIds],
              armies: {
                ...state.armies,
                ...parsedArmy.armies,
              },
            };
          },
          false,
          "add/armies"
        ),
      removeArmy: (armyId) =>
        set((state: State) => {
          const armies = cloneDeep(state.armies);
          delete armies[armyId];
          return {
            armies,
          };
        }),
      updateArmySteps: (armyId, steps) =>
        set(
          (state: State) => {
            return {
              fetchedArmyIds: [...state.fetchedArmyIds, armyId],
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
      updateArmyStepOrder: (update: reorderStepResponse) =>
        set((state: State) => {
          const currentArmy = state.armies[update.armyId];
          const movedStep = currentArmy.steps[update.movedStep.id];
          const shiftedStep = currentArmy.steps[update.shiftedStep.id];

          return {
            armies: {
              ...state.armies,
              [update.armyId]: {
                ...currentArmy,
                steps: {
                  ...currentArmy.steps,
                  [movedStep.id]: {
                    ...movedStep,
                    order: update.movedStep.order,
                  },
                  [shiftedStep.id]: {
                    ...shiftedStep,
                    order: update.shiftedStep.order,
                  },
                },
              },
            },
          };
        }),
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
      updateCurrentArmyStepRule: (stepId, rules) =>
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
        }),
      removeCurrentArmyStep: (stepId) =>
        set((state: State) => {
          const currentArmyId = state.currentArmyId;
          if (!currentArmyId) return state;
          const currentArmy = state.armies[currentArmyId];
          const steps = cloneDeep(currentArmy.steps);
          delete steps[stepId];
          return {
            armies: {
              ...state.armies,
              [currentArmyId]: {
                ...currentArmy,
                steps,
              },
            },
          };
        }),
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
