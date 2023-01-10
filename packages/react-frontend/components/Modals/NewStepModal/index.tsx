import { useInput, BaseInputs } from "hooks/form/useInput";
import { Input } from "@components/Form/Input";
import { useCallback } from "react";
import * as Styled from "./NewStepModal.styled";

const baseInputs = {
  stepName: {
    val: "",
    label: "Step Name",
    errorString: "A step name is required",
    validate: (val) => !!val,
  },
} satisfies BaseInputs;

export const NewStepModal = () => {
  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      const isFormValid = validateInputs();
      if (!isFormValid) return;
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
