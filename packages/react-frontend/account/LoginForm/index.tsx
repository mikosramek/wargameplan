import { useCallback, useEffect, useState } from "react";
import { MainButton } from "@components/MainButton";
import { IS_DEV } from "@utils/config";
import styles from "./loginForm.module.scss";
import Router from "next/router";
import { useApi, ENDPOINTS } from "hooks/useApi";
import { useAccountStore } from "store/account";

export const LoginForm = () => {
  const { login } = useApi();
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
        .catch(console.error);
    },
    [login, email, password]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.LoginForm}>
      <h2 className={styles.LoginForm__title}>Login</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MainButton copy="Login" />
    </form>
  );
};
