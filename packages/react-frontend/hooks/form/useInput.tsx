import { useState, HTMLInputTypeAttribute, useMemo } from "react";

export type BaseInputs = Record<
  string,
  {
    val: string;
    label: string;
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
    console.log({ value });
    setInputs({
      ...inputs,
      [inputName]: {
        label: inputs[inputName].label,
        val: value,
      },
    });
  };

  return { inputs, handleInputChange };
};
