import { useInput, BaseInputs } from "hooks/form/useInput";
import { Input } from "@components/Form/Input";
import { useCallback } from "react";
import * as Styled from "./NewStepModal.styled";
import { useApi } from "hooks/useApi";
import { useGeneralStore } from "@store/general";
import { useArmiesStore } from "@store/armies";
import { useLog } from "hooks/useLog";

const baseInputs = {
  stepName: {
    val: "",
    label: "Step Name",
    errorString: "A step name is required",
    validate: (val) => !!val,
  },
} satisfies BaseInputs;

export const NewStepModal = () => {
  const { posters } = useApi();
  const { error } = useLog();
  const closeModal = useGeneralStore((state) => state.closeModal);
  const updateCurrentArmyStep = useArmiesStore(
    (state) => state.updateCurrentArmyStep
  );
  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      const isFormValid = validateInputs();
      if (!isFormValid) return;

      posters
        .postNewStep({ stepName: form.stepName.val })
        .then((updatedSteps) => {
          if (updatedSteps && !(updatedSteps instanceof Error)) {
            closeModal();
            updateCurrentArmyStep(updatedSteps.step.id, updatedSteps.step);
          }
        })
        .catch(error);
    },
    [inputs]
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
      <Styled.Button>Submit</Styled.Button>
    </Styled.Form>
  );
};
