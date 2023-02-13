import { useEffect, useState } from "react";
import Router from "next/router";
import { useAccountStore } from "store/account";
import { clearStoredSession, getStoredSession } from "utils/general";
import { useLog } from "hooks/useLog";
import { authMap } from "hooks/auth/authMap";
import { useApi } from "hooks/useApi";

export const useAuth = () => {
  const accountStore = useAccountStore((state) => state);
  const currentRoute = typeof window !== "undefined" ? Router.route : null;
  const { log, error } = useLog();
  const { sessionLogin } = useApi();

  const [checkedForSession, setSessionCheck] = useState(false);

  const handleSessionCheck = async () => {
    const sessionId = getStoredSession();
    log("stored session: ", sessionId);
    if (sessionId) {
      try {
        const response = await sessionLogin({ sessionId });
        if (!(response instanceof Error)) {
          const { account, expired } = response;
          if (!expired) {
            accountStore.login({
              id: account.id,
              session: account.sessionId,
              isVerified: account.approved,
            });
          } else {
            clearStoredSession();
          }
        }
      } catch (err) {
        error(err);
      }
    }
    setSessionCheck(true);
  };
  // run once
  useEffect(() => {
    handleSessionCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentRoute || !checkedForSession) return;
    log({ currentRoute, Router });
    const checks = authMap.filter(({ route, redirectTo, routeExceptions }) => {
      if (redirectTo === currentRoute) return false;
      else if (routeExceptions && routeExceptions.includes(currentRoute))
        return false;
      else if (route === "*" || route === currentRoute) return true;
      else return false;
    });
    for (let i = 0; i < checks.length; i += 1) {
      const { valueToCheck, valueCheck, redirectTo } = checks[i];
      const value = accountStore[valueToCheck];
      const shouldRedirect = valueCheck(value);
      if (shouldRedirect) {
        Router.push(redirectTo);
        return;
      }
    }
  }, [accountStore, currentRoute, checkedForSession, log]);
};
