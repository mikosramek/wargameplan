import { ArmySteps } from "@store/armies";
import { countReset } from "console";
import useCounter from "hooks/useCounter";
import { useMemo } from "react";
import StepContainer from "./StepContainer";
type Props = {
  steps: ArmySteps[];
};

const StepsPage = ({ steps }: Props) => {
  const { counter, increaseCounter, decreaseCounter } = useCounter({
    maxCount: steps.length - 1,
  });

  const currentStep = useMemo(() => {
    if (!!steps[counter]) {
      return steps[counter];
    } else {
      return null;
    }
  }, [counter]);

  return (
    <>
      <button onClick={decreaseCounter}>backwards</button>
      <button onClick={increaseCounter}>forwards</button>
      {!!currentStep && <StepContainer step={currentStep} />}
    </>
  );
};

export default StepsPage;
