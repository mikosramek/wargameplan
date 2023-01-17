import { MainButton } from "@components/MainButton";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 5px 15px;
`;

export const Heading = styled.h3`
  /* padding: 5px 15px; */
  padding: 0;
  font-size: 18px;
  margin: 0;
  text-align: left;
`;

export const HeadingButton = styled.button`
  width: 80%;
  background: none;
  border: none;
  flex-grow: 1;
  padding: 0 0;
`;

export const Copy = styled.p`
  padding: 5px 15px;
  font-size: 18px;
  color: var(--light-black);
  margin: 0;
`;

export const DeleteButton = styled(MainButton)`
  width: 20%;
  padding: 0;
  flex-shrink: 1;
  border-left: 1px solid var(--border);
  border-radius: 0;
`;
