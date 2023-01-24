import styled from "styled-components";
import { MainButton } from "@components/MainButton";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 15px 0;
  &:first-of-type {
    margin-top: -15px;
  }
`;

export const StyledLink = styled.a`
  flex-grow: 1;
`;

export const Heading = styled.h2`
  margin: 0;
`;

export const DeleteButton = styled(MainButton)`
  padding-top: 0;
  padding-bottom: 0;
  border-left: 1px solid var(--border);
  border-radius: 0;
`;
