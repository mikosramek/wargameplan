import { orderSort } from "@utils/general";
import { useEffect } from "react";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { useApi } from "./useApi";
import { useLog } from "./useLog";

const useArmies = () => {
  const { getters, deleters } = useApi();
  const { log, error } = useLog();
  const setArmies = useArmiesStore((state) => state.setArmies);
  const updateArmySteps = useArmiesStore((state) => state.updateArmySteps);
  const removeCurrentArmyStep = useArmiesStore(
    (state) => state.removeCurrentArmyStep
  );
  const updateCurrentArmyStepRule = useArmiesStore(
    (state) => state.updateCurrentArmyStepRule
  );
  const armies = useArmiesStore((state) => state.armies);
  const armiesFetched = useArmiesStore((state) => state.armiesFetched);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && !armiesFetched) {
      handleArmiesFetch();
    }
  }, [isLoggedIn]);

  const handleArmiesFetch = async () => {
    log("FETCHING ARMIES");
    try {
      const armies = await getters.getArmies();
      if (!(armies instanceof Error)) {
        setArmies(armies);
      }
    } catch (e) {
      error(e);
    }
  };

  const handleArmyFetch = async (id: string) => {
    log("FETCHING SINGULAR ARMY", id);
    try {
      const steps = await getters.getArmySteps(id);
      if (steps && !(steps instanceof Error)) {
        log(steps);
        const stepMap = steps.sort(orderSort).reduce((total, current) => {
          return {
            ...total,
            [current.id]: current,
          };
        }, {});
        updateArmySteps(id, stepMap);
      }
    } catch (e) {
      error(e);
    }
  };

  const deleteRule = async (id: string) => {
    log("DELETING RULE", id);
    try {
      const response = await deleters.deleteRule(id);
      if (response && !(response instanceof Error)) {
        updateCurrentArmyStepRule(response.stepId, response.rules);
      }
    } catch (e) {
      error(e);
    }
  };

  const deleteStep = async (id: string) => {
    log("DELETING CURRENT STEP");
    try {
      const response = await deleters.deleteStep(id);
      if (response && !(response instanceof Error)) {
        removeCurrentArmyStep(response.stepIdRemoved);
      }
    } catch (e) {
      error(e);
    }
  };

  return { armies, armiesFetched, handleArmyFetch, deleteRule, deleteStep };
};

export default useArmies;
