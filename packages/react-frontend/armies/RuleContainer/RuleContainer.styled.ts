import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const Heading = styled.h3`
  padding: 5px 15px;
  font-size: 18px;
  margin: 0;
  text-align: left;
`;

export const HeadingButton = styled.button`
  width: 100%;
  background: none;
  border: none;
`;

export const Copy = styled.p`
  padding: 5px 15px;
  font-size: 18px;
  color: var(--light-black);
  margin: 0;
`;
