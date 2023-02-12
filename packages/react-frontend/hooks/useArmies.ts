import { useCallback, useEffect, useMemo, useState } from "react";
import { orderSort } from "utils/general";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { Direction, useApi } from "hooks/useApi";
import { useLog } from "hooks/useLog";
import { nameSort } from "utils/general";

const useArmies = (fetchArmies: boolean = false) => {
  const {
    getArmies,
    getArmySteps,
    deleteRule: deleteRuleRequest,
    reorderRule,
    deleteStep: deleteStepRequest,
    deleteArmy: deleteArmyRequest,
    postNewArmy,
    reorderStep,
  } = useApi();
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
    return Object.entries(armies).sort(nameSort);
  }, [armies]);

  const armiesFetched = useArmiesStore((state) => state.armiesFetched);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  const [fetchingArmies, setFetchingArmies] = useState(false);
  const handleArmiesFetch = useCallback(async () => {
    if (fetchingArmies) return;
    log("FETCHING ARMIES", { fetchingArmies });
    try {
      setFetchingArmies(true);
      const armies = await getArmies();
      if (!(armies instanceof Error)) {
        setArmies(armies);
      }
    } catch (e) {
      error(e);
    } finally {
      setFetchingArmies(false);
    }
  }, [fetchingArmies, error, getArmies, log, setArmies]);

  useEffect(() => {
    if (!fetchArmies) return;
    if (isLoggedIn && !armiesFetched) {
      handleArmiesFetch();
    }
  }, [fetchArmies, armiesFetched, handleArmiesFetch, isLoggedIn]);

  const [fetchingArmy, setFetchingArmy] = useState(false);
  const handleArmyFetch = useCallback(
    async (id: string) => {
      if (fetchingArmy) return;
      log("FETCHING SINGULAR ARMY", id, { fetchingArmy });
      try {
        setFetchingArmy(true);
        const steps = await getArmySteps(id);
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
      } finally {
        setFetchingArmy(false);
      }
    },
    [error, fetchingArmy, getArmySteps, log, updateArmySteps]
  );

  const deleteRule = useCallback(
    async (id: string) => {
      log("DELETING RULE", id);
      try {
        const response = await deleteRuleRequest(id);
        if (response && !(response instanceof Error)) {
          updateCurrentArmyStepRule(response.stepId, response.rules);
        }
      } catch (e) {
        error(e);
      }
    },
    [deleteRuleRequest, error, log, updateCurrentArmyStepRule]
  );

  const moveRule = useCallback(
    async (id: string, direction: Direction) => {
      log("MOVING RULE", id, direction);
      try {
        const response = await reorderRule(id, direction);
        if (response && !(response instanceof Error)) {
          updateCurrentArmyStepRule(response.stepId, response.rules);
        }
      } catch (e) {
        error(e);
      }
    },
    [error, log, reorderRule, updateCurrentArmyStepRule]
  );

  const deleteStep = useCallback(
    async (id: string) => {
      log("DELETING CURRENT STEP");
      try {
        const response = await deleteStepRequest(id);
        if (response && !(response instanceof Error)) {
          removeCurrentArmyStep(response.stepIdRemoved);
        }
      } catch (e) {
        error(e);
      }
    },
    [deleteStepRequest, error, log, removeCurrentArmyStep]
  );

  const moveStep = useCallback(
    async (id: string, direction: Direction) => {
      log("MOVING STEP", id, direction);
      try {
        const response = await reorderStep(id, direction);
        if (response && !(response instanceof Error)) {
          updateArmyStepOrder(response);
        }
      } catch (e) {
        error(e);
      }
    },
    [error, log, reorderStep, updateArmyStepOrder]
  );

  const createArmy = useCallback(
    async (armyName: string) => {
      log("CREATING ARMY");
      try {
        const response = await postNewArmy(armyName);
        if (response && !(response instanceof Error)) {
          addArmy(response);
        }
      } catch (e) {
        error(e);
      }
    },
    [addArmy, error, log, postNewArmy]
  );

  const deleteArmy = useCallback(
    async (armyId: string) => {
      log("REMOVING ARMY", armyId);
      try {
        const response = await deleteArmyRequest(armyId);
        if (response && !(response instanceof Error)) {
          removeArmy(response.armyId);
        }
      } catch (e) {
        error(e);
      }
    },
    [deleteArmyRequest, error, log, removeArmy]
  );

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
