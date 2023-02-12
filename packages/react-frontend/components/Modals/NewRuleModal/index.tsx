import { useCallback, useState } from "react";
import { useArmiesStore } from "store/armies";
import { useGeneralStore } from "store/general";
import { useInput, BaseInputs } from "hooks/form/useInput";
import { useApi } from "hooks/useApi";
import { useLog } from "hooks/useLog";
import { Input } from "components/Form/Input";
import * as Styled from "./NewRuleModal.styled";

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
} as BaseInputs;

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
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isFormValid = validateInputs();
      if (!isFormValid) return;
      const form = inputs as typeof baseInputs;
      setLoading(true);
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
        .catch(error)
        .finally(() => {
          setLoading(false);
        });
    },
    [
      closeModal,
      error,
      inputs,
      posters,
      updateCurrentArmyStepRule,
      validateInputs,
    ]
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
      <Styled.Button disabled={isLoading} type="submit">
        Submit
      </Styled.Button>
    </Styled.Form>
  );
};
