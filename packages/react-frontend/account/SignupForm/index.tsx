import { useCallback, useReducer, useRef, useState } from "react";
import Router from "next/router";
import * as Styled from "./SignupForm.styled";
import { Input } from "components/Form/Input";
import { IS_DEV } from "utils/config";
import { MainButton } from "components/MainButton";
import { useApi } from "hooks/useApi";
import { useAccountStore } from "store/account";
import { useLog } from "hooks/useLog";
import { storeSession } from "utils/general";
import { useError } from "hooks/form/useError";

export const SignupForm = () => {
  const { signUp } = useApi();
  const { error } = useLog();
  const logUserIn = useAccountStore((state) => state.login);
  const [email, setEmail] = useState(
    IS_DEV ? `miko-${Math.floor(Math.random() * 10)}@mikosramek.ca` : ""
  );
  const [password, setPassword] = useState(IS_DEV ? "password" : "");
  const [showPassword, toggleShowPassword] = useReducer((val) => !val, false);
  const { ErrorText, setError } = useError();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      signUp({ email, password })
        .then((response) => {
          if (response && !(response instanceof Error)) {
            const { account } = response;
            logUserIn({
              id: account.id,
              session: account.sessionId,
              isVerified: account.approved,
            });
            storeSession(account.sessionId);
            Router.push("/verify");
          }
        })
        .catch((e) => {
          error(e);
          setError(e.response.data);
        });
    },
    [email, error, logUserIn, password, signUp, setError]
  );

  return (
    <Styled.Form name="Sign up" onSubmit={handleSubmit}>
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
          ariaLabel={`Show password as plain text. Warning: this ${
            showPassword ? "is displaying" : "will display"
          }  your password as plain text.`}
        />
      </Styled.ToggleWrapper>
      <MainButton copy="Sign up" />
      {ErrorText}
    </Styled.Form>
  );
};
