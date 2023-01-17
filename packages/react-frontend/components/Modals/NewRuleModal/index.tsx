import { useInput, BaseInputs } from "hooks/form/useInput";
import { useArmiesStore } from "@store/armies";
import { useGeneralStore } from "@store/general";
import { useApi } from "hooks/useApi";
import { useLog } from "hooks/useLog";
import { useCallback, useState } from "react";
import * as Styled from "./NewRuleModal.styled";
import { Input } from "@components/Form/Input";

const baseInputs = {
  ruleName: {
    val: "",
    label: "Rule Name",
    errorString: "A rule name is required",
    validate: (val) => !!val,
  },
  ruleText: {
    val: "",
    label: "Rule Text",
    errorString: "Rule text is required",
    validate: (val) => !!val,
    specialType: "textarea",
  },
} satisfies BaseInputs;

export const NewRuleModal = () => {
  const { error } = useLog();
  const { posters } = useApi();
  const updateCurrentArmyStepRule = useArmiesStore(
    (state) => state.updateCurrentArmyStepRule
  );
  const closeModal = useGeneralStore((state) => state.closeModal);

  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isFormValid = validateInputs();
      if (!isFormValid) return;
      const form = inputs as typeof baseInputs;
      posters
        .postNewRule({
          name: form.ruleName.val,
          text: form.ruleText.val,
        })
        .then((updatedSteps) => {
          if (updatedSteps && !(updatedSteps instanceof Error)) {
            closeModal();
            updateCurrentArmyStepRule(updatedSteps.stepId, updatedSteps.rules);
          }
        })
        .catch(error);
    },
    [inputs, posters]
  );
  return (
    <Styled.Form onSubmit={handleSubmit}>
      {Object.entries(inputs).map(
        ([name, { val, label, error = "", specialType }], index) => {
          return (
            <Input
              key={`${name}-${index}`}
              inputName={name}
              label={label}
              value={val}
              onChange={handleInputChange}
              errorMessage={error}
              type={specialType}
            />
          );
        }
      )}
      <Styled.Button type="submit">Submit</Styled.Button>
    </Styled.Form>
  );
};
