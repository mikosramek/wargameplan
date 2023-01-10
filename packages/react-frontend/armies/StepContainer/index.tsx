import { ArmySteps } from "@store/armies";
import RuleContainer from "@armies/RuleContainer";
import * as Styled from "./StepContainer.styled";
import { useGeneralStore } from "@store/general";

type Props = {
  step: ArmySteps;
};

const StepContainer = ({ step }: Props) => {
  const editorMode = useGeneralStore((state) => state.editorMode);
  const openModal = useGeneralStore((state) => state.openModal);

  return (
    <Styled.Wrapper>
      <Styled.Heading>{step.name}</Styled.Heading>
      <Styled.InnerWrapper>
        {step.rules.map((rule) => (
          <RuleContainer key={`rule-${rule.id}`} rule={rule} />
        ))}
        {editorMode && (
          <Styled.NewRuleButton
            aria-label="Opens a modal to add a new rule"
            onClick={() => openModal("NewRule")}
          >
            +
          </Styled.NewRuleButton>
        )}
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
};

export default StepContainer;
