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
  const { handleArmyFetch } = useArmies(true);
  const armiesFetched = useArmiesStore((state) => state.armiesFetched);
  const setCurrentArmyId = useArmiesStore((state) => state.setCurrentArmyId);

  const getArmy = useArmiesStore((state) => state.getArmy);

  const army = getArmy(id as string);
  const armyFetched = !!army && army.fetched;

  useHeading({ heading: armyFetched ? army.name : "-" });

  useEffect(() => {
    if (!armiesFetched || armyFetched) {
      return;
    }
    if (id && typeof id === "string") {
      console.log("setting current army id");
      setCurrentArmyId(id);
      if (!armyFetched) {
        console.log("fetching army");
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
