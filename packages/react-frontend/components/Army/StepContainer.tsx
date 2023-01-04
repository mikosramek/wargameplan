import { ArmySteps } from "@store/armies";
import RuleContainer from "./RuleContainer";

type Props = {
  steps: ArmySteps;
};

const StepContainer = ({ steps }: Props) => {
  return (
    <section>
      <h2>{steps.name}</h2>
      {steps.rules.map((rule) => (
        <RuleContainer key={`rule-${rule.id}`} rule={rule} />
      ))}
    </section>
  );
};

export default StepContainer;
