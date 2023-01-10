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
  const {
    inputs: i,
    handleInputChange: hic,
  }: {
    inputs: BaseInputs;
    handleInputChange: (stepName: string, value: string) => void;
  } = useInput({ baseInputs });

  const [inputs, setInputs] = useState(baseInputs);

  const handleInputChange = (
    inputName: keyof typeof baseInputs,
    value: string
  ) => {
    setInputs({
      ...inputs,
      [inputName]: {
        label: inputs[inputName].label,
        val: value,
      },
    });
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(inputs);
      console.log(i.step);
    },
    [i]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {Object.entries(i).map(([name, { val, label }]) => {
        return (
          <Input inputName={name} label={label} value={val} onChange={hic} />
        );
      })}
      <Styled.Button>Submit</Styled.Button>
    </Styled.Form>
  );
};
