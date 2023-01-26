import { ArmySteps } from "@store/armies";
import RuleContainer from "@armies/RuleContainer";
import * as Styled from "./StepContainer.styled";
import { useGeneralStore } from "@store/general";
import useArmies from "hooks/useArmies";
import { useCallback } from "react";
import { StepsControlBar } from "@armies/StepsControlBar";

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

  const handleReorder = useCallback((direction: number) => {}, [step]);

  return (
    <Styled.Wrapper>
      <Styled.HeadingWrapper>
        <Styled.Heading>{step.name}</Styled.Heading>
        {!!editorMode && (
          <>
            <Styled.ReOrderButton
              copy="<"
              ariaLabel="Moves phase left one"
              onClick={() => handleReorder(-1)}
            />
            <Styled.ReOrderButton
              copy=">"
              ariaLabel="Moves phase right one"
              onClick={() => handleReorder(1)}
            />
            <Styled.DeleteButton copy="Delete phase" onClick={handleDelete} />
          </>
        )}
      </Styled.HeadingWrapper>
      <Styled.InnerWrapper>
        {step.rules.map((rule, index) => (
          <RuleContainer
            key={`rule-${rule.id}`}
            rule={rule}
            first={index === 0}
            last={index === step.rules.length - 1}
          />
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
