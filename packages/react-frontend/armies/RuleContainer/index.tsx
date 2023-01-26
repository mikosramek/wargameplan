import { useCallback, useReducer, useState } from "react";
import { ArmyRule } from "@store/armies";
import { useGeneralStore } from "@store/general";
import useArmies from "hooks/useArmies";
import * as Styled from "./RuleContainer.styled";
import { Direction } from "hooks/useApi";

type Props = {
  rule: ArmyRule;
  first?: boolean;
  last?: boolean;
};

const RuleContainer = ({ rule, first = false, last = false }: Props) => {
  const { deleteRule, moveRule } = useArmies();
  const isEditorMode = useGeneralStore((state) => state.editorMode);
  const [isCopyVisible, toggleCopy] = useReducer(
    (state: boolean) => !state,
    false
  );
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(() => {
    const confirmation = confirm(`Delete the "${rule.name}" rule?`);
    if (confirmation) deleteRule(rule.id);
  }, [rule]);

  const handleReorder = useCallback(
    async (direction: Direction) => {
      if (isLoading) return;
      setLoading(true);
      await moveRule(rule.id, direction);
      setLoading(false);
    },
    [rule, isLoading]
  );

  return (
    <Styled.Wrapper>
      <Styled.HeadingWrapper>
        <Styled.HeadingButton onClick={toggleCopy}>
          <Styled.Heading>{rule.name}</Styled.Heading>
        </Styled.HeadingButton>
        {isEditorMode && (
          <>
            {!first && (
              <Styled.ReOrderButton
                copy="^"
                ariaLabel="Moves rule up one"
                onClick={() => handleReorder(-1)}
                disabled={isLoading}
              />
            )}
            {!last && (
              <Styled.ReOrderButton
                copy="⌄"
                ariaLabel="Moves rule down one"
                onClick={() => handleReorder(1)}
                disabled={isLoading}
              />
            )}
            <Styled.DeleteButton copy="Delete rule" onClick={handleDelete} />
          </>
        )}
      </Styled.HeadingWrapper>
      {!!isCopyVisible && <Styled.Copy>{rule.text}</Styled.Copy>}
    </Styled.Wrapper>
  );
};

export default RuleContainer;
