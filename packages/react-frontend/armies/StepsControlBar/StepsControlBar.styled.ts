import styled, { css } from "styled-components";
import { MainButton } from "components/MainButton";

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

export const ListButton = styled(MainButton)`
  padding: 8px 10px 6px;
  &:disabled {
    cursor: auto;
    background: var(--border);
  }
`;

export const TurnButton = styled(ListButton)`
  border: 1px solid var(--black);
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 100%;
  font-size: 28px;
  &:first-of-type {
    margin-bottom: 15px;
  }
`;

export const ToggleLabel = styled.span`
  position: absolute;
  left: -5px;
  top: 0;
  bottom: 0;
  padding: 2px 14px 0;
  border-radius: 35px;
  height: 100%;
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
        left: calc(100% - 70px);
      }
    `}
`;

export const ListInput = styled.input`
  @media (min-width: 860px) {
    &:focus,
    &:active {
      & + label span {
        border: 1px solid var(--black);
      }
    }
  }
`;

export const InnerControlWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PhaseControlWrapper = styled(InnerControlWrapper)`
  flex-direction: column;
  position: absolute;
  right: 10px;
  /* top: 40%; */
  bottom: 10%;
`;
