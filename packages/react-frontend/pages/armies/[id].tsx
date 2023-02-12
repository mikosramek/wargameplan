import { useEffect } from "react";
import { useRouter } from "next/router";
import { useArmiesStore } from "store/armies";
import useArmies from "hooks/useArmies";
import { useHeading } from "hooks/useHeading";
import LayoutWrapper from "components/LayoutWrapper";
import StepsPage from "armies/Steps";

const ArmyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { armiesFetched, handleArmyFetch } = useArmies();
  const setCurrentArmyId = useArmiesStore((state) => state.setCurrentArmyId);

  const getArmy = useArmiesStore((state) => state.getArmy);

  const army = getArmy(id as string);
  const armyFetched = !!army && army.fetched;

  useHeading({ heading: armyFetched ? army.name : "-" });

  useEffect(() => {
    if (!armiesFetched) return;
    if (id && typeof id === "string") {
      setCurrentArmyId(id);
      if (!armyFetched) {
        handleArmyFetch(id);
      }
    }
  }, [id, armiesFetched, setCurrentArmyId, armyFetched, handleArmyFetch]);

  if (!armiesFetched || !armyFetched || !id) {
    return null; // TODO: loader
  }

  return (
    <LayoutWrapper>
      <StepsPage steps={army.steps} />
    </LayoutWrapper>
  );
};

export default ArmyPage;
