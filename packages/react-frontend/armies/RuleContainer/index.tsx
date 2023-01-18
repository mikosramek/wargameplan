import { useCallback, useReducer } from "react";
import { ArmyRule } from "@store/armies";
import { useGeneralStore } from "@store/general";
import useArmies from "hooks/useArmies";
import * as Styled from "./RuleContainer.styled";

type Props = {
  rule: ArmyRule;
};

const RuleContainer = ({ rule }: Props) => {
  const { deleteRule } = useArmies();
  const isEditorMode = useGeneralStore((state) => state.editorMode);
  const [isCopyVisible, toggleCopy] = useReducer(
    (state: boolean) => !state,
    false
  );

  const handleDelete = useCallback(() => {
    const confirmation = confirm(`Delete the "${rule.name}" rule?`);
    if (confirmation) deleteRule(rule.id);
  }, [rule]);

  return (
    <Styled.Wrapper>
      <Styled.HeadingWrapper>
        <Styled.HeadingButton onClick={toggleCopy}>
          <Styled.Heading>{rule.name}</Styled.Heading>
        </Styled.HeadingButton>
        {isEditorMode && (
          <Styled.DeleteButton copy="Delete rule" onClick={handleDelete} />
        )}
      </Styled.HeadingWrapper>
      {!!isCopyVisible && <Styled.Copy>{rule.text}</Styled.Copy>}
    </Styled.Wrapper>
  );
};

export default RuleContainer;
