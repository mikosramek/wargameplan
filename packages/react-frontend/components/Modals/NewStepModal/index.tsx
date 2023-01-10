import { useInput, BaseInputs } from "hooks/form/useInput";
import { Input } from "@components/Form/Input";
import { useCallback, useState } from "react";
import * as Styled from "./NewStepModal.styled";

const baseInputs = {
  stepName: {
    val: "",
    label: "Step Name",
  },
} satisfies BaseInputs;

export const NewStepModal = () => {
  const { inputs, handleInputChange } = useInput({ baseInputs });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      console.log(form.stepName.val);
    },
    [inputs]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {Object.entries(inputs).map(([name, { val, label }], index) => {
        return (
          <Input
            key={`${name}-index`}
            inputName={name}
            label={label}
            value={val}
            onChange={handleInputChange}
          />
        );
      })}
      <Styled.Button>Submit</Styled.Button>
    </Styled.Form>
  );
};
