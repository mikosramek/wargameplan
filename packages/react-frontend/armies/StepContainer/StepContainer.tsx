import { ArmySteps } from "@store/armies";
import RuleContainer from "@armies/RuleContainer/RuleContainer";
import * as Styled from "./StepContainer.styled";
import { useGeneralStore } from "@store/general";
import useModal from "hooks/useModal";

type Props = {
  step: ArmySteps;
};

const StepContainer = ({ step }: Props) => {
  const editorMode = useGeneralStore((state) => state.editorMode);
  const { Modal, toggleModal } = useModal("NewRule");
  return (
    <Styled.Wrapper>
      <Styled.Heading>{step.name}</Styled.Heading>
      <Styled.InnerWrapper>
        {step.rules.map((rule) => (
          <RuleContainer key={`rule-${rule.id}`} rule={rule} />
        ))}
        {true && <button onClick={toggleModal}>Add Rule</button>}
      </Styled.InnerWrapper>
      {Modal}
    </Styled.Wrapper>
  );
};

export default StepContainer;
