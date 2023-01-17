import styled from "styled-components";

export const Wrapper = styled.section`
  width: 90%;
  max-width: 810px;
  margin: 0 auto;
  border: 1px solid var(--border);
  border-radius: 15px;
  overflow: hidden;
`;

export const Heading = styled.h2`
  background: var(--main);
  padding: 15px;
  margin: 0;
  font-size: 22px;
  border-radius: 15px 15px 0 0;
`;

export const InnerWrapper = styled.div`
  /* padding: 15px; */
`;

export const NewRuleButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-top: 1px solid var(--border);
  font-size: 24px;
`;
