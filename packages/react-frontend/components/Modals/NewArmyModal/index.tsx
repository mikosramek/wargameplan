import { useCallback, useState } from "react";
import { useGeneralStore } from "store/general";
import { Input } from "components/Form/Input";
import { useInput, BaseInputs } from "hooks/form/useInput";
import * as Styled from "./NewArmyModal.styled";
import { useLog } from "hooks/useLog";
import useArmies from "hooks/useArmies";
import { ModalButton } from "components/Modals/ModalButton";

const baseInputs = {
  armyName: {
    val: "",
    label: "Army Name",
    errorString: "An army name is required",
    validate: (val) => !!val,
  },
} as BaseInputs;

export const NewArmyModal = () => {
  const { createArmy } = useArmies();
  const { error } = useLog();
  const closeModal = useGeneralStore((state) => state.closeModal);
  const [isLoading, setLoading] = useState(false);

  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      const isFormValid = validateInputs();
      if (!isFormValid) return;
      try {
        setLoading(true);
        await createArmy(form.armyName.val);
        closeModal();
      } catch (e) {
        // TODO: error state
        error(e);
      } finally {
        setLoading(false);
      }
    },
    [closeModal, createArmy, error, inputs, validateInputs]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {Object.entries(inputs).map(([name, { val, label, error }], index) => {
        return (
          <Input
            key={`${name}-${index}`}
            inputName={name}
            label={label}
            value={val}
            onChange={handleInputChange}
            errorMessage={error}
          />
        );
      })}
      <ModalButton copy="Submit" disabled={isLoading} />
      <ModalButton
        onClick={closeModal}
        copy="Cancel"
        type="reset"
        disabled={isLoading}
      />
    </Styled.Form>
  );
};
