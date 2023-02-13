import { MainButton } from "components/MainButton";
import styled from "styled-components";

export const Button = styled(MainButton)`
  border: 1px solid var(--impact);
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
  &:focus {
    border-color: var(--white);
  }
`;
