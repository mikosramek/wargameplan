import { useEffect, useMemo, useState } from "react";
import { ArmySteps, useArmiesStore } from "store/armies";
import useCounter from "hooks/useCounter";
import StepContainer from "armies/StepContainer";
import { StepsControlBar } from "armies/StepsControlBar";
import { useLog } from "hooks/useLog";
import { orderSort } from "utils/general";
import * as Styled from "./Steps.styled";

type Props = {
  steps: Record<string, ArmySteps>;
};

const StepsPage = ({ steps }: Props) => {
  const { log } = useLog();
  const parsedSteps = useMemo(() => {
    return Object.values(steps).sort(orderSort);
  }, [steps]);
  const setCurrentStepId = useArmiesStore((state) => state.setCurrentStepId);
  const [currentStep, setCurrentStep] = useState<ArmySteps | null>(null);

  const { counter, increaseCounter, decreaseCounter } = useCounter({
    maxCount: parsedSteps.length - 1,
  });

  const stepCount = parsedSteps.length;

  useEffect(() => {
    const step = parsedSteps[counter];
    if (!!step) {
      setCurrentStep(parsedSteps[counter]);
      setCurrentStepId(step.id);
    } else {
      log("no current step");
      setCurrentStep(null);
      if (parsedSteps.length > 0) {
        log("decreasing step counter");
        decreaseCounter();
      }
    }
  }, [counter, decreaseCounter, log, parsedSteps, setCurrentStepId]);

  return (
    <>
      <StepsControlBar
        previousStep={decreaseCounter}
        nextStep={increaseCounter}
      />
      {!!currentStep && (
        <StepContainer step={currentStep} stepCount={stepCount} />
      )}
      {!currentStep && (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>No phases</Styled.EmptyTitle>
          <Styled.EmptyCopy>Use edit mode to add a phase</Styled.EmptyCopy>
        </Styled.EmptyContainer>
      )}
    </>
  );
};

export default StepsPage;
