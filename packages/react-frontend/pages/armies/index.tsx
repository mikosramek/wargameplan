import LayoutWrapper from "@components/LayoutWrapper";
import ArmyPreview from "armies/ArmyPreview";
import useArmies from "hooks/useArmies";

const Armies = () => {
  const { armies, armiesFetched } = useArmies();

  if (!armiesFetched) {
    return null;
  }

  return (
    <LayoutWrapper>
      <h1>Your Armies</h1>
      <section>
        {Object.entries(armies).map(([id, army]) => {
          return <ArmyPreview id={id} army={army} key={`army-${id}`} />;
        })}
      </section>
    </LayoutWrapper>
  );
};

export default Armies;
