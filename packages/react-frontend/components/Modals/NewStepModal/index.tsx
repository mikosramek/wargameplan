import { useCallback, useState } from "react";
import { useInput, BaseInputs } from "hooks/form/useInput";
import { useApi } from "hooks/useApi";
import { useLog } from "hooks/useLog";
import { Input } from "components/Form/Input";
import { useGeneralStore } from "store/general";
import { useArmiesStore } from "store/armies";
import * as Styled from "./NewStepModal.styled";

const baseInputs = {
  stepName: {
    val: "",
    label: "Step Name",
    errorString: "A step name is required",
    validate: (val) => !!val,
  },
} as BaseInputs;

export const NewStepModal = () => {
  const { postNewStep } = useApi();
  const { error } = useLog();
  const closeModal = useGeneralStore((state) => state.closeModal);
  const updateCurrentArmyStep = useArmiesStore(
    (state) => state.updateCurrentArmyStep
  );
  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      const isFormValid = validateInputs();
      if (!isFormValid) return;

      setLoading(true);
      postNewStep({ stepName: form.stepName.val })
        .then((updatedSteps) => {
          if (updatedSteps && !(updatedSteps instanceof Error)) {
            closeModal();
            updateCurrentArmyStep(updatedSteps.step.id, updatedSteps.step);
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
      postNewStep,
      updateCurrentArmyStep,
      validateInputs,
    ]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {Object.entries(inputs).map(([name, { val, label, error }], index) => {
        return (
          <Input
            key={`${name}-${index}`}
            inputName={name}
            label={label}
            value={val}
            onChange={handleInputChange}
            errorMessage={error}
          />
        );
      })}
      <Styled.Button disabled={isLoading}>Submit</Styled.Button>
    </Styled.Form>
  );
};
