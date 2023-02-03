import { useMemo } from "react";
import { NewRuleModal } from "components/Modals/NewRuleModal";
import { NewStepModal } from "components/Modals/NewStepModal";
import ModalWrapper from "components/Modals/ModalWrapper";
import { useGeneralStore } from "store/general";
import { NewArmyModal } from "components/Modals/NewArmyModal";

export const ModalType = {
  NewRule: "NewRule",
  NewStep: "NewStep",
  NewArmy: "NewArmy",
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
      case "NewArmy":
        return (
          <ModalWrapper heading="Add a New Army">
            <NewArmyModal />
          </ModalWrapper>
        );
      default:
        return null;
    }
  }, [currentModal]);

  return { Modal };
};

export default useModal;
