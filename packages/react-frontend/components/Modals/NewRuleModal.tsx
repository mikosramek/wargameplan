import { useArmiesStore } from "@store/armies";
import { useGeneralStore } from "@store/general";
import { useApi } from "hooks/useApi";
import { useCallback, useState } from "react";
import * as Styled from "./NewRuleModal.styled";

const NewRuleModal = () => {
  const { currentArmyId, currentStepId, updateArmySteps } = useArmiesStore(
    (state) => ({
      currentArmyId: state.currentArmyId,
      currentStepId: state.currentStepId,
      updateArmySteps: state.updateArmySteps,
    })
  );
  const closeModal = useGeneralStore((state) => state.closeModal);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const { posters } = useApi();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!currentArmyId || !currentStepId) return;
      posters
        .postNewRule({
          armyId: currentArmyId,
          stepId: currentStepId,
          name,
          text,
        })
        .then((updatedSteps) => {
          if (updatedSteps && !(updatedSteps instanceof Error)) {
            closeModal();
            updateArmySteps(currentArmyId, updatedSteps);
          }
        })
        .catch(console.error);
    },
    [name, text, posters]
  );
  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Label htmlFor="name">Rule Name:</Styled.Label>
      <Styled.Input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Styled.Label htmlFor="text">Rule Text:</Styled.Label>
      <Styled.TextArea
        name="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></Styled.TextArea>
      <Styled.Button type="submit">Submit</Styled.Button>
    </Styled.Form>
  );
};

export default NewRuleModal;
