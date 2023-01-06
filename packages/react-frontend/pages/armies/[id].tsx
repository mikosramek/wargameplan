import StepsPage from "@armies/Steps";
import LayoutWrapper from "@components/LayoutWrapper";
import useArmies from "hooks/useArmies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useArmiesStore } from "store/armies";

const ArmyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { armiesFetched, handleArmyFetch } = useArmies();
  const setCurrentArmyId = useArmiesStore((state) => state.setCurrentArmyId);
  const clearCurrentArmyId = useArmiesStore(
    (state) => state.clearCurrentArmyId
  );

  const army = useArmiesStore((state) => state.getArmy)(id as string);

  const armyFetched = !!army && army.fetched;

  useEffect(() => {
    if (id && typeof id === "string") {
      setCurrentArmyId(id);
      if (!armyFetched) {
        handleArmyFetch(id);
      }
    }
  }, [id]);

  useEffect(() => {
    return () => {
      clearCurrentArmyId();
    };
  }, []);

  if (!armiesFetched || !armyFetched) {
    return null; // TODO: loader
  }

  console.log(army);

  return (
    <LayoutWrapper>
      <>
        <h1>{army.name}</h1>
        <StepsPage steps={army.steps} />
      </>
    </LayoutWrapper>
  );
};

export default ArmyPage;
