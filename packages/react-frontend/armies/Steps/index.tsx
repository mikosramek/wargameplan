import { ArmySteps, useArmiesStore } from "@store/armies";
import useCounter from "hooks/useCounter";
import { useEffect, useMemo, useState } from "react";
import StepContainer from "@armies/StepContainer";
import { StepsControlBar } from "@armies/StepsControlBar";
import useModal from "hooks/useModal";
type Props = {
  steps: Record<string, ArmySteps>;
};

const StepsPage = ({ steps }: Props) => {
  const parsedSteps = useMemo(() => {
    return Object.values(steps);
  }, [steps]);
  const { Modal } = useModal();
  const setCurrentStepId = useArmiesStore((state) => state.setCurrentStepId);
  const [currentStep, setCurrentStep] = useState<ArmySteps | null>(null);

  const { counter, increaseCounter, decreaseCounter } = useCounter({
    maxCount: parsedSteps.length - 1,
  });

  useEffect(() => {
    const step = parsedSteps[counter];
    if (!!step) {
      setCurrentStep(parsedSteps[counter]);
      setCurrentStepId(step.id);
    } else {
      setCurrentStep(null);
    }
  }, [counter, parsedSteps]);

  return (
    <>
      <StepsControlBar
        previousStep={decreaseCounter}
        nextStep={increaseCounter}
      />
      {!!currentStep && <StepContainer step={currentStep} />}
      {Modal}
    </>
  );
};

export default StepsPage;
