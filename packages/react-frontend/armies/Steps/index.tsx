import { ArmySteps, useArmiesStore } from "@store/armies";
import useCounter from "hooks/useCounter";
import { useEffect, useState } from "react";
import StepContainer from "@armies/StepContainer";
import { StepsControlBar } from "@armies/StepsControlBar";
import useModal from "hooks/useModal";
type Props = {
  steps: ArmySteps[];
};

const StepsPage = ({ steps }: Props) => {
  const { Modal } = useModal();
  const setCurrentStepId = useArmiesStore((state) => state.setCurrentStepId);
  const [currentStep, setCurrentStep] = useState<ArmySteps | null>(null);

  const { counter, increaseCounter, decreaseCounter } = useCounter({
    maxCount: steps.length - 1,
  });

  useEffect(() => {
    const step = steps[counter];
    if (!!step) {
      setCurrentStep(steps[counter]);
      setCurrentStepId(step.id);
    } else {
      setCurrentStep(null);
    }
  }, [counter, steps]);

  return (
    <>
      <StepsControlBar
        previousStep={decreaseCounter}
        nextStep={increaseCounter}
        addPhase={() => null}
      />
      {!!currentStep && <StepContainer step={currentStep} />}
      {Modal}
    </>
  );
};

export default StepsPage;
