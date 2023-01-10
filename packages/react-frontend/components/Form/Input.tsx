import { useState, HTMLInputTypeAttribute } from "react";
import * as Styled from "./Input.styled";

type Props = {
  inputName: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  // stateHandler: ReturnType<typeof useState>;
  onChange: (name: any, input: string) => void;
};

export const Input = ({
  inputName,
  label,
  type = "text",
  value,
  onChange,
}: Props) => {
  return (
    <>
      <Styled.Label htmlFor={inputName}>{label}:</Styled.Label>
      <Styled.InputBase
        type={type}
        id={inputName}
        name={inputName}
        value={value}
        onChange={(e) => onChange(inputName, e.target.value)}
      />
    </>
  );
};
