import { useEffect } from "react";
import { useAccountStore } from "store/account";
import { useArmiesStore } from "store/armies";
import { useApi } from "./useApi";

const useArmies = () => {
  const { getArmies } = useApi();
  const setArmies = useArmiesStore((state) => state.setArmies);
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

  const handleArmyFetch = async () => {};

  return { armies, armiesFetched };
};

export default useArmies;
