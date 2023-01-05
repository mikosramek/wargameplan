import create from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  editorMode: boolean;
  toggleEditorMode: () => void;
}

export const useGeneralStore = create<State>()(
  devtools(
    (set) => ({
      editorMode: false,
      toggleEditorMode: () =>
        set((state) => ({ editorMode: !state.editorMode })),
    }),
    {
      name: "general-state",
    }
  )
);
