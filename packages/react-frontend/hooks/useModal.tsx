import { useMemo, useReducer } from "react";
import NewRuleModal from "@components/Modals/NewRuleModal";
import ModalWrapper from "@components/Modals/ModalWrapper";
import { useGeneralStore } from "@store/general";

export const ModalType = {
  NewRule: "NewRule",
};

const useModal = () => {
  const currentModal = useGeneralStore((state) => state.currentModal);
  const closeModal = useGeneralStore((state) => state.closeModal);
  // const [modalState, toggleModal] = useReducer((state) => !state, false);
  const Modal = useMemo(() => {
    if (!currentModal) return null;
    switch (currentModal) {
      case "NewRule":
        return (
          <ModalWrapper heading="Add a New Rule" closeModal={closeModal}>
            <NewRuleModal />
          </ModalWrapper>
        );
      default:
        return null;
    }
  }, [currentModal]);

  return { Modal };
};

export default useModal;
