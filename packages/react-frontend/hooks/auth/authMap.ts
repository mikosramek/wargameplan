import { State } from "store/account";

type AuthChecker = {
  route: string;
  routeExceptions?: string[];
  valueToCheck: keyof State;
  valueCheck: (value: any) => boolean;
  redirectTo: string;
};

export const authMap = [
  //   {
  //     route: "/",
  //     valueToCheck: "isVerified",
  //     valueCheck: (value: any) => !value,
  //     redirectTo: "/verify",
  //   },
  // logged in, don't allow signup
  {
    route: "/signup",
    valueToCheck: "isLoggedIn",
    valueCheck: (value: any) => !!value,
    redirectTo: "/armies",
  },
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
    routeExceptions: ["/signup"],
    valueToCheck: "isLoggedIn",
    valueCheck: (value: any) => !value,
    redirectTo: "/",
  },
] as AuthChecker[];