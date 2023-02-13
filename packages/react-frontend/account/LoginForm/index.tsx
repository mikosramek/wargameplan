import { useCallback, useState } from "react";
import Router from "next/router";
import { MainButton } from "components/MainButton";
import { IS_DEV } from "utils/config";
import { storeSession } from "utils/general";
import { useApi } from "hooks/useApi";
import { useAccountStore } from "store/account";
import { useLog } from "hooks/useLog";
import { Input } from "components/Form/Input";
import * as Styled from "./LoginForm.styled";
import { useError } from "hooks/form/useError";

export const LoginForm = () => {
  const { login } = useApi();
  const { error } = useLog();
  const logUserIn = useAccountStore((state) => state.login);
  const [email, setEmail] = useState(IS_DEV ? "miko@mikosramek.ca" : "");
  const [password, setPassword] = useState(IS_DEV ? "password" : "");

  const { ErrorText, setError } = useError();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      login({ email, password })
        .then((response) => {
          if (response && !(response instanceof Error)) {
            const { account } = response;
            logUserIn({
              id: account.id,
              session: account.sessionId,
              isVerified: account.approved,
            });
            storeSession(account.sessionId);
            Router.push("/armies");
          }
        })
        .catch((err) => {
          error(err);
          const errMessage = err.response.data;
          switch (errMessage) {
            case "Email or Password incorrect":
              setError(errMessage);
              break;
            default:
              setError("Something went wrong");
          }
        });
    },
    [email, error, logUserIn, login, password, setError]
  );

  return (
    <Styled.Form name="Login" onSubmit={handleSubmit}>
      <Styled.Title>Login</Styled.Title>
      <Input
        type="email"
        inputName="email"
        label="Email"
        value={email}
        onChange={(_i, val) => setEmail(val)}
        required
      />
      <Input
        type="password"
        inputName="current-password"
        label="Password"
        value={password}
        onChange={(_i, val) => setPassword(val)}
        autocomplete="current-password"
        required
      />
      <MainButton copy="Login" />
      {ErrorText}
    </Styled.Form>
  );
};
