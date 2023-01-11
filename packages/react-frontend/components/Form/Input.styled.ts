import styled, { css } from "styled-components";

export const Label = styled.label`
  display: block;
`;

export const ErrorLabel = styled.label`
  display: block;
  color: var(--impact);
`;

const InputBaseStyling = css`
  margin-bottom: 10px;
  width: 100%;
`;

export const InputBase = styled.input`
  ${InputBaseStyling}
`;

export const TextArea = styled.textarea`
  ${InputBaseStyling}
  resize: vertical;
  min-height: 150px;
  max-height: 50vh;
`;
