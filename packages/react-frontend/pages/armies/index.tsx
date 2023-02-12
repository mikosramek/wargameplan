import LayoutWrapper from "components/LayoutWrapper";
import ArmyPreview from "armies/ArmyPreview/ArmyPreview";
import useArmies from "hooks/useArmies";
import { useHeading } from "hooks/useHeading";
import { useGeneralStore } from "store/general";

import * as Styled from "styles/armies.styled";

const Armies = () => {
  const { alphabeticalArmies: armies, armiesFetched } = useArmies();
  const openModal = useGeneralStore((state) => state.openModal);
  useHeading({ heading: "Your Armies" });

  if (!armiesFetched) {
    return null;
  }

  return (
    <LayoutWrapper>
      <Styled.SectionWrapper>
        {armies.map(([id, army]) => {
          return <ArmyPreview id={id} army={army} key={`army-${id}`} />;
        })}
        <Styled.NewArmyButton
          onClick={() => openModal("NewArmy")}
          aria-label="Opens a modal to add a new army"
        >
          +
        </Styled.NewArmyButton>
      </Styled.SectionWrapper>
    </LayoutWrapper>
  );
};

export default Armies;
