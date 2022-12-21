import LayoutWrapper from "@components/LayoutWrapper";
import ArmyPreview from "armies/ArmyPreview";
import { useApi } from "hooks/useApi";
import { useUser } from "hooks/useUser";
import { useEffect } from "react";
import { useArmiesStore } from "store/armies";

const Armies = () => {
  const { isLoggedIn } = useUser({ redirectTo: "/" });
  const { getArmies } = useApi();
  const setArmies = useArmiesStore((state) => state.setArmies);
  const armies = useArmiesStore((state) => state.armies);

  useEffect(() => {
    if (isLoggedIn) {
      handleArmiesFetch();
    }
  }, [isLoggedIn]);
  const handleArmiesFetch = async () => {
    try {
      const armies = await getArmies();
      if (!(armies instanceof Error)) {
        setArmies(armies);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(Object.entries(armies));
  }, [armies]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <LayoutWrapper>
      <h1>Your Armies</h1>
      <section>
        {Object.entries(armies).map(([id, army]) => {
          return <ArmyPreview id={id} army={army} />;
        })}
      </section>
    </LayoutWrapper>
  );
};

export default Armies;
