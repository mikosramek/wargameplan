import styled, { css } from "styled-components";

export const Header = styled.header`
  margin-bottom: 15px;
  background-color: var(--main);
  padding: 15px 0;
`;

export const Heading = styled.h1`
  margin: 0;
`;

export const InnerHeading = styled.span`
  display: block;
  width: 90%;
  max-width: 810px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLink = styled.a<{ isActive: boolean }>`
  padding: 0 10px;
  border-right: 1px solid var(--border);
  text-decoration: none;
  &:last-of-type {
    border-right: none;
  }
  ${({ isActive }) => {
    if (isActive) {
      return css`
        text-decoration: underline;
      `;
    }
  }}
`;

export const StyledSignout = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
`;
