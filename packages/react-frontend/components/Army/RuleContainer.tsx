import { ArmyRule } from "@store/armies";
import { useReducer } from "react";
import * as Styled from "./RuleContainer.styled";

type Props = {
  rule: ArmyRule;
};

const RuleContainer = ({ rule }: Props) => {
  const [isCopyVisible, toggleCopy] = useReducer(
    (state: boolean) => !state,
    false
  );

  return (
    <Styled.Wrapper>
      <Styled.HeadingButton onClick={toggleCopy}>
        <Styled.Heading>{rule.name}</Styled.Heading>
      </Styled.HeadingButton>
      {!!isCopyVisible && <Styled.Copy>{rule.text}</Styled.Copy>}
    </Styled.Wrapper>
  );
};

export default RuleContainer;
