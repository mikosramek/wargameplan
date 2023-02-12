import create from "zustand";
import { devtools } from "zustand/middleware";

export type Flags = {
  emailVerification: boolean;
};

interface State {
  flags: Flags;
  fetched: boolean;
  setFlags: (flags: Flags) => void;
}

export const useConfigStore = create<State>()(
  devtools(
    (set) => ({
      flags: {
        emailVerification: false,
      },
      fetched: false,
      setFlags: (flags: Flags) => set(() => ({ flags, fetched: true })),
    }),
    {
      name: "config-state",
    }
  )
);
