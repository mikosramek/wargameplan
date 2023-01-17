import { ArmySteps } from "@store/armies";

type orderSortObject = ArmySteps;
export const orderSort = (a: orderSortObject, b: orderSortObject) => {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  else return 0;
};
