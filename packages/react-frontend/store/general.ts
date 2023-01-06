import { ModalType } from "hooks/useModal";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  editorMode: boolean;
  toggleEditorMode: () => void;
  currentModal: keyof typeof ModalType | null;
  openModal: (modal: keyof typeof ModalType) => void;
  closeModal: () => void;
}

export const useGeneralStore = create<State>()(
  devtools(
    (set) => ({
      editorMode: false,
      toggleEditorMode: () =>
        set((state) => ({ editorMode: !state.editorMode })),
      currentModal: null,
      openModal: (modal: keyof typeof ModalType) =>
        set(() => ({ currentModal: modal })),
      closeModal: () => set(() => ({ currentModal: null })),
    }),
    {
      name: "general-state",
    }
  )
);
