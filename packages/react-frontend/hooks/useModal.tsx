import { useMemo } from "react";
import { NewRuleModal } from "@components/Modals/NewRuleModal";
import { NewStepModal } from "@components/Modals/NewStepModal";
import ModalWrapper from "@components/Modals/ModalWrapper";
import { useGeneralStore } from "@store/general";

export const ModalType = {
  NewRule: "NewRule",
  NewStep: "NewStep",
};

const useModal = () => {
  const currentModal = useGeneralStore((state) => state.currentModal);

  const Modal = useMemo(() => {
    if (!currentModal) return null;
    switch (currentModal) {
      case "NewRule":
        return (
          <ModalWrapper heading="Add a New Rule">
            <NewRuleModal />
          </ModalWrapper>
        );
      case "NewStep":
        return (
          <ModalWrapper heading="Add a New Step">
            <NewStepModal />
          </ModalWrapper>
        );
      default:
        return null;
    }
  }, [currentModal]);

  return { Modal };
};

export default useModal;
