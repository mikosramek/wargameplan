import { ArmySteps, useArmiesStore } from "@store/armies";
import useCounter from "hooks/useCounter";
import { useEffect, useMemo, useState } from "react";
import StepContainer from "@armies/StepContainer";
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
    console.log("counter updated");
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
      <button onClick={decreaseCounter}>backwards</button>
      <button onClick={increaseCounter}>forwards</button>
      {!!currentStep && <StepContainer step={currentStep} />}
      {Modal}
    </>
  );
};

export default StepsPage;
