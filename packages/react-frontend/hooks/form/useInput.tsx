import { useState } from "react";

export type BaseInputs = Record<
  string,
  {
    val: string;
    label: string;
    validate: (val: string) => boolean;
    errorString: string;
    error?: string;
  }
>;

type Props = {
  baseInputs: BaseInputs;
};

export type handleInputChangeProps = (inputName: string, value: string) => void;

export const useInput = ({ baseInputs }: Props) => {
  const [inputs, setInputs] = useState(baseInputs);

  const handleInputChange = (
    inputName: keyof typeof baseInputs,
    value: string
  ) => {
    setInputs({
      ...inputs,
      [inputName]: {
        ...inputs[inputName],
        val: value,
      },
    });
  };

  const validateInputs = () => {
    const inputCopy = { ...inputs };
    let isFormValid = true;
    for (const inputObject of Object.values(inputCopy)) {
      const isInputValid = inputObject.validate(inputObject.val);
      inputObject.error = !isInputValid ? inputObject.errorString : undefined;
      if (!isInputValid) {
        isFormValid = false;
      }
    }
    setInputs(inputCopy);
    return isFormValid;
  };

  return { inputs, handleInputChange, validateInputs };
};
