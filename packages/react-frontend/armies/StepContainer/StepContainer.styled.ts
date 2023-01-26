import { MainButton } from "@components/MainButton";
import styled from "styled-components";

export const Wrapper = styled.section`
  width: 90%;
  max-width: 810px;
  margin: 0 auto;
  border: 1px solid var(--border);
  border-radius: 15px;
  overflow: hidden;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main);
  padding: 15px;
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: 22px;
  width: 60%;
`;

export const DeleteButton = styled(MainButton)`
  background: none;
  border-radius: 0;
  border-left: 1px solid var(--border);
  width: 20%;
  padding: 0;
`;

export const ReOrderButton = styled(DeleteButton)`
  width: 10%;
`;

export const InnerWrapper = styled.div``;

export const NewRuleButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-top: 1px solid var(--border);
  font-size: 24px;
`;
