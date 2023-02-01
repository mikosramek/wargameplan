import { ArmySteps } from "@store/armies";

type orderSortObject = ArmySteps;
export const orderSort = (a: orderSortObject, b: orderSortObject) => {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  else return 0;
};

const SESSION_KEY = "wargame-planner-session-id";
export const getStoredSession = () => {
  return localStorage.getItem(SESSION_KEY);
};

export const storeSession = (sessionId: string) => {
  return localStorage.setItem(SESSION_KEY, sessionId);
};

export const clearStoredSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
