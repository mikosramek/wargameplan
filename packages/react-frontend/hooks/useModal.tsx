import { useMemo, useReducer } from "react";
import NewRuleModal from "@components/Modals/NewRuleModal";
import ModalWrapper from "@components/Modals/ModalWrapper";

const ModalType = {
  NewRule: "NewRule",
};

const useModal = (modalType: keyof typeof ModalType) => {
  const [modalState, toggleModal] = useReducer((state) => !state, false);
  const Modal = useMemo(() => {
    if (!modalState) return null;
    switch (modalType) {
      case "NewRule":
        return (
          <ModalWrapper heading="Add a New Rule" closeModal={toggleModal}>
            <NewRuleModal />
          </ModalWrapper>
        );
      default:
        return null;
    }
  }, [modalType, modalState]);

  return { Modal, toggleModal };
};

export default useModal;
