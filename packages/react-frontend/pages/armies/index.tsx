import LayoutWrapper from "@components/LayoutWrapper";
import ArmyPreview from "armies/ArmyPreview";
import useArmies from "hooks/useArmies";
import { useUser } from "hooks/useUser";

const Armies = () => {
  const { isLoggedIn } = useUser({ redirectTo: "/" });
  const { armies, armiesFetched } = useArmies();

  if (!isLoggedIn || !armiesFetched) {
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
