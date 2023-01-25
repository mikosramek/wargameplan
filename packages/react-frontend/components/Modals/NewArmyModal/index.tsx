import { useGeneralStore } from "@store/general";
import { Input } from "@components/Form/Input";
import { useApi } from "hooks/useApi";
import { useInput, BaseInputs } from "hooks/form/useInput";
import * as Styled from "./NewArmyModal.styled";
import { useCallback } from "react";
import { useLog } from "hooks/useLog";
import useArmies from "hooks/useArmies";

const baseInputs = {
  armyName: {
    val: "",
    label: "Army Name",
    errorString: "An army name is required",
    validate: (val) => !!val,
  },
} satisfies BaseInputs;

export const NewArmyModal = () => {
  const { posters } = useApi();
  const { createArmy } = useArmies();
  const { error } = useLog();
  const closeModal = useGeneralStore((state) => state.closeModal);

  const { inputs, handleInputChange, validateInputs } = useInput({
    baseInputs,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = inputs as typeof baseInputs;
      const isFormValid = validateInputs();
      if (!isFormValid) return;

      createArmy(form.armyName.val);
      closeModal();
      //   posters
      //     .postNewStep({ stepName: form.stepName.val })
      //     .then((newArmy) => {
      //       if (newArmy && !(newArmy instanceof Error)) {
      //         closeModal();
      //         console.log({ newArmy });
      //       }
      //     })
      //     .catch(error);
    },
    [inputs]
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
      <Styled.Button>Submit</Styled.Button>
    </Styled.Form>
  );
};
