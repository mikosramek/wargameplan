import Router from "next/router";
import { useEffect } from "react";
import { useAccountStore } from "store/account";

export const useUser = ({ redirectTo = "" }) => {
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const accountId = useAccountStore((state) => state.accountId);
  const isVerified = useAccountStore((state) => state.isVerified);
  const session = useAccountStore((state) => state.session);

  useEffect(() => {
    console.log({ isLoggedIn, accountId });
    if (!redirectTo) return;

    if (redirectTo && !isLoggedIn) {
      Router.replace(redirectTo);
    }
  }, [isLoggedIn, redirectTo]);

  return { accountId, isLoggedIn, isVerified, session };
};
