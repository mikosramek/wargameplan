import { ReactNode } from "react";
import { useGeneralStore } from "store/general";
import * as Styled from "./ModalWrapper.styled";

type Props = {
  heading: string;
  children: ReactNode;
};

const ModalWrapper = ({ heading, children }: Props) => {
  const closeModal = useGeneralStore((state) => state.closeModal);

  return (
    <Styled.ModalWrapper>
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
  );
};

export default ModalWrapper;
