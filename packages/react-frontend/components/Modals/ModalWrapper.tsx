import FocusTrap from "focus-trap-react";
import { ReactNode, useEffect, useRef } from "react";
import { useGeneralStore } from "store/general";
import * as Styled from "./ModalWrapper.styled";

type Props = {
  heading: string;
  children: ReactNode;
};

const ModalWrapper = ({ heading, children }: Props) => {
  const closeModal = useGeneralStore((state) => state.closeModal);

  const modal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modal.current) modal.current.focus();
  }, [modal]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  return (
    <FocusTrap>
      <Styled.ModalWrapper ref={modal}>
        <Styled.ModalBackground />
        <Styled.CloseButton
          aria-label={`Closes the ${heading} modal.`}
          onClick={closeModal}
        >
          x
        </Styled.CloseButton>
        <Styled.Modal>
          <Styled.Heading>{heading}</Styled.Heading>
          {children}
        </Styled.Modal>
      </Styled.ModalWrapper>
    </FocusTrap>
  );
};

export default ModalWrapper;
