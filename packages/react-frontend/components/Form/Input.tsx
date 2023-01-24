import { HTMLInputTypeAttribute } from "react";
import * as Styled from "./Input.styled";

type Props = {
  inputName: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: (name: any, input: string) => void;
  errorMessage?: string;
};

export const Input = ({
  inputName,
  label,
  type = "text",
  value,
  onChange,
  errorMessage,
}: Props) => {
  return (
    <>
      <Styled.Label htmlFor={inputName}>{label}:</Styled.Label>
      {!!errorMessage && (
        <Styled.ErrorLabel htmlFor={inputName}>
          {errorMessage}
        </Styled.ErrorLabel>
      )}
      {type === "textarea" && (
        <Styled.TextArea
          id={inputName}
          name={inputName}
          value={value}
          onChange={(e) => onChange(inputName, e.target.value)}
          aria-invalid={!!errorMessage}
        />
      )}
      {type !== "textarea" && (
        <Styled.InputBase
          type={type}
          id={inputName}
          name={inputName}
          value={value}
          onChange={(e) => onChange(inputName, e.target.value)}
          aria-invalid={!!errorMessage}
        />
      )}
    </>
  );
};
