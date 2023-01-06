import StepsPage from "@armies/Steps/StepsPage";
import LayoutWrapper from "@components/LayoutWrapper";
import useArmies from "hooks/useArmies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useArmiesStore } from "store/armies";

const ArmyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { armiesFetched, handleArmyFetch } = useArmies();

  const army = useArmiesStore((state) => state.getArmy)(id as string);

  const armyFetched = !!army && army.fetched;

  useEffect(() => {
    if (!armyFetched && id && typeof id === "string") {
      handleArmyFetch(id);
    }
  }, [id]);

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
