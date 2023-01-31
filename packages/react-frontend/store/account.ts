import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface State {
  isLoggedIn: boolean;
  accountId: string | null;
  session: string | null;
  isVerified: boolean;
  login: ({
    id,
    session,
    isVerified,
  }: {
    id: string;
    session: string;
    isVerified: boolean;
  }) => void;
  logout: () => void;
}

export const useAccountStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        accountId: null,
        session: null,
        isVerified: false,
        login: ({ id, session, isVerified }) =>
          set(
            () => ({
              isLoggedIn: true,
              accountId: id,
              session,
              isVerified,
            }),
            false,
            "account/login"
          ),
        logout: () =>
          set({
            isLoggedIn: false,
            accountId: null,
            session: null,
            isVerified: false,
          }),
      }),
      {
        name: "account-state",
      }
    )
  )
);
