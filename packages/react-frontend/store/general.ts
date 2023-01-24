import { ModalType } from "hooks/useModal";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  editorMode: boolean;
  toggleEditorMode: () => void;
  currentModal: keyof typeof ModalType | null;
  openModal: (modal: keyof typeof ModalType) => void;
  closeModal: () => void;
  heading: string;
  setHeading: (newHeading: string) => void;
}

export const useGeneralStore = create<State>()(
  devtools(
    (set) => ({
      heading: "Warhammer Gameplan",
      setHeading: (newHeading: string) => set(() => ({ heading: newHeading })),
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
