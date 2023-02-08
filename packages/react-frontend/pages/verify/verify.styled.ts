import styled from "styled-components";

export const Wrapper = styled.section`
  max-width: 810px;
  width: 90%;
  margin: 15px auto;
  background: var(--main);
  padding: 15px;
  border-radius: 15px;
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

export const Copy = styled.p`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
