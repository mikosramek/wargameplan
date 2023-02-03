import { ArmySteps } from "store/armies";
import RuleContainer from "armies/RuleContainer";
import * as Styled from "./StepContainer.styled";
import { useGeneralStore } from "store/general";
import useArmies from "hooks/useArmies";
import { useCallback, useState } from "react";
import { Direction } from "hooks/useApi";
import { useLog } from "hooks/useLog";

type Props = {
  step: ArmySteps;
  stepCount: number;
};

const StepContainer = ({ step, stepCount }: Props) => {
  const { error } = useLog();
  const editorMode = useGeneralStore((state) => state.editorMode);
  const openModal = useGeneralStore((state) => state.openModal);
  const { deleteStep, moveStep } = useArmies();

  const canReorder = stepCount > 1;

  const handleDelete = useCallback(() => {
    const confirmation = confirm(`Delete the "${step.name}" step?`);
    if (confirmation) deleteStep(step.id);
  }, [step]);

  const [isLoading, setLoading] = useState(false);
  const handleReorder = useCallback(
    async (direction: Direction) => {
      if (isLoading || !canReorder) return;
      try {
        setLoading(true);
        await moveStep(step.id, direction);
      } catch (e) {
        error(e);
      } finally {
        setLoading(false);
      }
    },
    [step, isLoading, canReorder]
  );

  return (
    <Styled.Wrapper>
      <Styled.HeadingWrapper>
        <Styled.Heading>{step.name}</Styled.Heading>
        {!!editorMode && (
          <>
            {!!canReorder && (
              <>
                <Styled.ReOrderButton
                  copy="<"
                  ariaLabel="Moves phase left one"
                  onClick={() => handleReorder(-1)}
                  disabled={isLoading}
                />
                <Styled.ReOrderButton
                  copy=">"
                  ariaLabel="Moves phase right one"
                  onClick={() => handleReorder(1)}
                  disabled={isLoading}
                />
              </>
            )}
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
        {step.rules.length === 0 && (
          <Styled.EmptyContainer>
            <Styled.EmptyTitle>No rules</Styled.EmptyTitle>
            <Styled.EmptyCopy>Use edit mode to add a rule</Styled.EmptyCopy>
          </Styled.EmptyContainer>
        )}
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
