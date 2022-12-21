import LayoutWrapper from "@components/LayoutWrapper";
import useArmies from "hooks/useArmies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useArmiesStore } from "store/armies";

const ArmyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { armiesFetched } = useArmies();

  const army = useArmiesStore((state) => state.getArmy)(id as string);

  useEffect(() => {
    if (!army) {
    }
  }, []);

  useEffect(() => {
    if (!army.fetched) {
      console.log("FETCHING SINGULAR ARMY", id);
      // fetch army steps / everything else involved
    }
  }, []);

  if (!armiesFetched || !army.fetched) {
    return null;
  }

  return (
    <LayoutWrapper>
      <h1>{army.name}</h1>
    </LayoutWrapper>
  );
};

export default ArmyPage;
