import styled from "styled-components";

export const Form = styled.form`
  border: 1px solid var(--border);
  padding: 15px;
  display: block;
  max-width: 250px;
  margin: 0 auto;
  border-radius: 15px;
  background: var(--main);
`;

export const Title = styled.h2`
  font-size: 24px;
  margin: 0 0 10px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  & label {
    margin-right: 10px;
  }
  & input {
    width: auto;
    margin-bottom: 0;
    cursor: pointer;
  }
`;

export const Error = styled.p`
  color: var(--impact);
  margin-bottom: 0;
  text-align: center;
`;
