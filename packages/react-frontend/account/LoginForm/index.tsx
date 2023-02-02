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

export const LoginForm = () => {
  const { account } = useApi();
  const { error } = useLog();
  const logUserIn = useAccountStore((state) => state.login);
  const [email, setEmail] = useState(IS_DEV ? "miko2@mikosramek.ca" : "");
  const [password, setPassword] = useState(IS_DEV ? "password" : "");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      account
        .login({ email, password })
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
        .catch(error);
    },
    [email, password]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Title>Login</Styled.Title>
      <Input
        type="email"
        inputName="email"
        label="Email"
        value={email}
        onChange={(_i, val) => setEmail(val)}
      />
      <Input
        type="password"
        inputName="current-password"
        label="Password"
        value={password}
        onChange={(_i, val) => setPassword(val)}
        autocomplete="current-password"
      />
      <MainButton copy="Login" />
    </Styled.Form>
  );
};
