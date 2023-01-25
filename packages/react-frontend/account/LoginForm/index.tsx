import { useCallback, useState } from "react";
import Router from "next/router";
import { MainButton } from "@components/MainButton";
import { IS_DEV } from "@utils/config";
import { useApi } from "hooks/useApi";
import { useAccountStore } from "store/account";
import { useLog } from "hooks/useLog";
import { Input } from "@components/Form/Input";
import * as Styled from "./LoginForm.styled";

export const LoginForm = () => {
  const { login } = useApi();
  const { error } = useLog();
  const logUserIn = useAccountStore((state) => state.login);
  const [email, setEmail] = useState(IS_DEV ? "miko2@mikosramek.ca" : "");
  const [password, setPassword] = useState(IS_DEV ? "password" : "");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login({ email, password })
        .then((account) => {
          if (!(account instanceof Error)) {
            logUserIn(account.id, account.email, account.approved);
            Router.push("/armies");
          }
        })
        .catch(error);
    },
    [login, email, password]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Title>Login</Styled.Title>
      <Input
        type="email"
        inputName="email"
        label="Email"
        value={email}
        onChange={setEmail}
      />
      <Input
        type="password"
        inputName="password"
        label="Password"
        value={password}
        onChange={setPassword}
      />
      <MainButton copy="Login" />
    </Styled.Form>
  );
};
