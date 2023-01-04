import { ArmyRule } from "@store/armies";

type Props = {
  rule: ArmyRule;
};

const RuleContainer = ({ rule }: Props) => {
  return (
    <>
      <h3>{rule.name}</h3>
      <p>{rule.text}</p>
    </>
  );
};

export default RuleContainer;
