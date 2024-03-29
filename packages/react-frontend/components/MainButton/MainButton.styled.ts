import styled from "styled-components";

export const Button = styled.button`
  color: var(--impact);
  background: var(--white);
  border: none;
  padding: 8px 15px 6px;
  font-size: 18px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  &:disabled {
    color: var(--impact-dark);
  }
  &:focus {
    color: var(--white);
    background: var(--impact);
  }
`;
