import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000a;
  z-index: 10;
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  width: 75%;
`;

export const CloseButton = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: none;
  padding: 0;
  font-size: 36px;
  background-color: var(--white);
  color: var(--impact);
`;

export const Heading = styled.h2`
  background-color: var(--main);
  margin: 0 0 10px;
  padding: 10px 15px;
`;
