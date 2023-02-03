import { Armies, ArmySteps } from "store/armies";

const baseStep = {
  id: "",
  rules: [],
  name: "",
};
export const STEPS: ArmySteps[] = [
  {
    order: 4,
    ...baseStep,
  },
  {
    order: 1,
    ...baseStep,
  },
  {
    order: 3,
    ...baseStep,
  },
  {
    order: 2,
    ...baseStep,
  },
];

const baseArmy = {
  fetched: true,
  steps: {},
};
export const ARMIES: Armies = {
  last: {
    name: "zulu",
    ...baseArmy,
  },
  "3": {
    name: "OMEGA",
    ...baseArmy,
  },
  first: {
    name: "ALPHA",
    ...baseArmy,
  },
  "4": {
    name: "dinosaur",
    ...baseArmy,
  },
  "5": {
    name: "the biggest army there ever was",
    ...baseArmy,
  },
};
