import { useCallback, useReducer, useState } from "react";
import * as Styled from "./SignupForm.styled";
import { Input } from "@components/Form/Input";
import { IS_DEV } from "@utils/config";
import { MainButton } from "@components/MainButton";

export const SignupForm = () => {
  const [email, setEmail] = useState(IS_DEV ? "email" : "");
  const [password, setPassword] = useState(IS_DEV ? "password" : "");
  const [showPassword, toggleShowPassword] = useReducer((val) => !val, false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // login({ email, password })
      //   .then((account) => {
      //     if (!(account instanceof Error)) {
      //       logUserIn(account.id, account.email, account.approved);
      //       Router.push("/armies");
      //     }
      //   })
      //   .catch(error);
    },
    [email, password]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Title>Sign up</Styled.Title>
      <Input
        type="email"
        inputName="email"
        label="Email"
        value={email}
        onChange={(_i, val) => setEmail(val)}
        required
        autocomplete="email"
      />
      <Input
        type={showPassword ? "text" : "password"}
        inputName="new-password"
        label="Password"
        value={password}
        onChange={(_i, val) => setPassword(val)}
        autocomplete="new-password"
        required
      />
      <Styled.ToggleWrapper>
        <Input
          type="checkbox"
          inputName="showPassword"
          label="Show Password"
          checked={showPassword}
          onChange={toggleShowPassword}
          aria-label="Show password as plain text. Warning: this will display your password on the screen."
        />
      </Styled.ToggleWrapper>
      <MainButton copy="Sign up" />
    </Styled.Form>
  );
};
