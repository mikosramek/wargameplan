import Router from "next/router";
import { useEffect } from "react";
import { useAccountStore, State } from "store/account";

type AuthChecker = {
  route: string;
  valueToCheck: keyof State;
  valueCheck: (value: any) => boolean;
  redirectTo: string;
};

const authMap = [
  //   {
  //     route: "/",
  //     valueToCheck: "isVerified",
  //     valueCheck: (value: any) => !value,
  //     redirectTo: "/verify",
  //   },
  {
    // logged in, skip the base page
    route: "/",
    valueToCheck: "isLoggedIn",
    valueCheck: (value: any) => !!value,
    redirectTo: "/armies",
  },
  {
    // not logged in, redirect to base login page
    route: "*",
    valueToCheck: "isLoggedIn",
    valueCheck: (value: any) => !value,
    redirectTo: "/",
  },
] as AuthChecker[];

export const useAuth = () => {
  const account = useAccountStore((state) => state);
  const currentRoute = typeof window !== "undefined" ? Router.asPath : null;

  useEffect(() => {
    if (!currentRoute) return;
    console.log({ currentRoute });
    const checks = authMap.filter(({ route, redirectTo }) => {
      if (redirectTo === currentRoute) return false;
      else if (route === "*" || route === currentRoute) return true;
      else return false;
    });
    for (let i = 0; i < checks.length; i += 1) {
      const { valueToCheck, valueCheck, redirectTo } = checks[i];
      const value = account[valueToCheck];
      const shouldRedirect = valueCheck(value);
      if (shouldRedirect) {
        Router.push(redirectTo);
        return;
      }
    }
  }, [currentRoute]);
};
