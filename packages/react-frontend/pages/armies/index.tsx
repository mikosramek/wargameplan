import LayoutWrapper from "@components/LayoutWrapper";
import ArmyPreview from "@armies/ArmyPreview/ArmyPreview";
import useArmies from "hooks/useArmies";
import { useHeading } from "hooks/useHeading";

import * as Styled from "./armies.styled";

const Armies = () => {
  const { armies, armiesFetched } = useArmies();
  useHeading({ heading: "Your Armies" });

  if (!armiesFetched) {
    return null;
  }

  return (
    <LayoutWrapper>
      <Styled.SectionWrapper>
        {Object.entries(armies).map(([id, army]) => {
          return <ArmyPreview id={id} army={army} key={`army-${id}`} />;
        })}
      </Styled.SectionWrapper>
    </LayoutWrapper>
  );
};

export default Armies;
