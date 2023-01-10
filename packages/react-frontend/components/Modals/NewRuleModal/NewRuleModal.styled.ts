import styled, { css } from "styled-components";

export const Form = styled.form`
  padding: 15px;
  font-size: 18px;
`;

export const Label = styled.label`
  display: block;
`;

const InputBase = css`
  margin-bottom: 10px;
  width: 100%;
`;

export const Input = styled.input`
  ${InputBase}
`;

export const TextArea = styled.textarea`
  ${InputBase}
  resize: vertical;
  min-height: 150px;
  max-height: 50vh;
`;

export const Button = styled.button`
  display: block;
`;
