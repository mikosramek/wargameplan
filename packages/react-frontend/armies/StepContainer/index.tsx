import { ArmySteps } from "@store/armies";
import RuleContainer from "@armies/RuleContainer";
import * as Styled from "./StepContainer.styled";
import { useGeneralStore } from "@store/general";
import useArmies from "hooks/useArmies";
import { useCallback } from "react";

type Props = {
  step: ArmySteps;
};

const StepContainer = ({ step }: Props) => {
  const editorMode = useGeneralStore((state) => state.editorMode);
  const openModal = useGeneralStore((state) => state.openModal);
  const { deleteStep } = useArmies();

  const handleDelete = useCallback(() => {
    const confirmation = confirm(`Delete the "${step.name}" step?`);
    if (confirmation) deleteStep(step.id);
  }, [step]);

  return (
    <Styled.Wrapper>
      <Styled.HeadingWrapper>
        <Styled.Heading>{step.name}</Styled.Heading>
        {!!editorMode && (
          <Styled.DeleteButton copy="Delete phase" onClick={handleDelete} />
        )}
      </Styled.HeadingWrapper>
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
