import styled, { css } from "styled-components";

export const Nav = styled.nav`
  display: block;
  max-width: 810px;
  width: 90%;
  margin: 15px auto;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const ListItem = styled.li`
  margin-right: 10px;
`;

export const ListButton = styled.button`
  padding: 8px 10px 6px;
  &:disabled {
    cursor: auto;
  }
`;

export const ToggleLabel = styled.span`
  position: absolute;
  left: 1px;
  top: 5%;
  bottom: 0;
  padding: 0 14px;
  border-radius: 35px;
  height: 90%;
  background: var(--main);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  transition: left 0.3s ease-out;
`;

type LabelProps = {
  checked: boolean;
};

export const ListLabel = styled.label<LabelProps>`
  display: block;
  cursor: pointer;
  position: relative;
  margin-right: 5px;
  height: 35px;
  width: 100px;
  border-radius: 35px;
  background: var(--secondary);

  ${({ checked }) =>
    checked &&
    css`
      background: var(--impact);
      ${ToggleLabel} {
        left: calc(100% - 75px);
      }
    `}
`;

export const ListInput = styled.input`
  cursor: pointer;
  display: none;
`;

export const InnerControlWrapper = styled.div`
  display: flex;
  align-items: center;
`;
