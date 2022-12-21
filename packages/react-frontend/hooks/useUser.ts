import Router from "next/router";
import { useEffect } from "react";

export const useUser = ({ redirectTo = "" }) => {
  const account = {
    isLoggedIn: false,
  };
  useEffect(() => {
    if (!redirectTo || !account) return;

    if (redirectTo && !account.isLoggedIn) {
      Router.replace(redirectTo);
    }
  }, [account, redirectTo]);

  return { account };
};
