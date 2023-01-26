import { orderSort } from "@utils/general";
import { useEffect, useMemo } from "react";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { Direction, useApi } from "./useApi";
import { useLog } from "./useLog";

const useArmies = () => {
  const { getters, deleters, posters, patchers } = useApi();
  const { log, error } = useLog();
  const setArmies = useArmiesStore((state) => state.setArmies);
  const addArmy = useArmiesStore((state) => state.addArmy);
  const removeArmy = useArmiesStore((state) => state.removeArmy);
  const updateArmySteps = useArmiesStore((state) => state.updateArmySteps);
  const updateArmyStepOrder = useArmiesStore(
    (state) => state.updateArmyStepOrder
  );
  const removeCurrentArmyStep = useArmiesStore(
    (state) => state.removeCurrentArmyStep
  );
  const updateCurrentArmyStepRule = useArmiesStore(
    (state) => state.updateCurrentArmyStepRule
  );
  const armies = useArmiesStore((state) => state.armies);

  const alphabeticalArmies = useMemo(() => {
    return Object.entries(armies).sort((a, b) => {
      const [_a, aArmy] = a;
      const [_b, bArmy] = b;
      if (aArmy.name > bArmy.name) return 1;
      else if (aArmy.name < bArmy.name) return -1;
      else return 0;
    });
  }, [armies]);

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

  const moveRule = async (id: string, direction: Direction) => {
    log("MOVING RULE", id, direction);
    try {
      const response = await patchers.reorderRule(id, direction);
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

  const moveStep = async (id: string, direction: Direction) => {
    log("MOVING STEP", id, direction);
    try {
      const response = await patchers.reorderStep(id, direction);
      if (response && !(response instanceof Error)) {
        updateArmyStepOrder(response);
      }
    } catch (e) {
      error(e);
    }
  };

  const createArmy = async (armyName: string) => {
    log("CREATING ARMY");
    try {
      const response = await posters.postNewArmy(armyName);
      if (response && !(response instanceof Error)) {
        addArmy(response);
      }
    } catch (e) {
      error(e);
    }
  };

  const deleteArmy = async (armyId: string) => {
    log("REMOVING ARMY", armyId);
    try {
      const response = await deleters.deleteArmy(armyId);
      if (response && !(response instanceof Error)) {
        removeArmy(response.armyId);
      }
    } catch (e) {
      error(e);
    }
  };

  return {
    armies,
    alphabeticalArmies,
    armiesFetched,
    handleArmyFetch,
    deleteRule,
    moveRule,
    moveStep,
    deleteStep,
    createArmy,
    deleteArmy,
  };
};

export default useArmies;
