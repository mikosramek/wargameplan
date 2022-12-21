import { useCallback, useState } from "react";
import { MainButton } from "@components/MainButton";
import { IS_DEV } from "@utils/config";
import styles from "./loginForm.module.scss";
import Router from "next/router";
import { useApi } from "hooks/useApi";

export const LoginForm = () => {
  const { get } = useApi({ accountId: null, session: null });
  const [email, setEmail] = useState(IS_DEV ? "miko2@mikosramek.ca" : "");
  const [password, setPassword] = useState(IS_DEV ? "password" : "");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      get("account", { email, password })
        .then((account) => {
          console.log(account);
          // set account
        })
        .catch(console.error);
    },
    [get, email, password]
  );

  // once account is set
  // Router.push("/armies");

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
