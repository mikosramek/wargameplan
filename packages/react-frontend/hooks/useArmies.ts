import { useEffect } from "react";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { useApi } from "./useApi";

const useArmies = () => {
  const { getArmies, getArmySteps } = useApi();
  const setArmies = useArmiesStore((state) => state.setArmies);
  const updateArmySteps = useArmiesStore((state) => state.updateArmySteps);
  const armies = useArmiesStore((state) => state.armies);
  const armiesFetched = useArmiesStore((state) => state.armiesFetched);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && !armiesFetched) {
      handleArmiesFetch();
    }
  }, [isLoggedIn]);

  const handleArmiesFetch = async () => {
    console.log("FETCHING ARMIES");
    try {
      const armies = await getArmies();
      if (!(armies instanceof Error)) {
        setArmies(armies);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleArmyFetch = async (id: string) => {
    console.log("FETCHING SINGULAR ARMY", id);
    try {
      const steps = await getArmySteps(id);
      if (!(steps instanceof Error)) {
        console.log(steps);
        updateArmySteps(id, steps);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { armies, armiesFetched, handleArmyFetch };
};

export default useArmies;
