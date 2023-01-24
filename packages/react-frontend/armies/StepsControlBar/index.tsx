import { useGeneralStore } from "@store/general";
import * as Styled from "./StepsControlBar.styled";

type Props = {
  previousStep: () => void;
  nextStep: () => void;
};

export const StepsControlBar = ({ previousStep, nextStep }: Props) => {
  const { editorMode, toggleEditorMode } = useGeneralStore();
  const openModal = useGeneralStore((state) => state.openModal);

  return (
    <Styled.Nav>
      <Styled.List>
        <Styled.PhaseControlWrapper>
          <Styled.ListItem>
            <Styled.TurnButton
              ariaLabel="Navigate to previous phase"
              copy="&#x3c;"
              onClick={previousStep}
            />
          </Styled.ListItem>
          <Styled.ListItem>
            <Styled.TurnButton
              ariaLabel="Navigate to next phase"
              onClick={nextStep}
              copy="&#x3e;"
            />
          </Styled.ListItem>
        </Styled.PhaseControlWrapper>
        <Styled.InnerControlWrapper>
          <Styled.ListItem>
            <Styled.ListInput
              type="checkbox"
              name="editMode"
              id="editMode"
              checked={editorMode}
              onChange={toggleEditorMode}
              className="visually-hidden"
            />
            <Styled.ListLabel checked={editorMode} htmlFor="editMode">
              <Styled.ToggleLabel>
                {editorMode ? "Edit" : "Play"}
              </Styled.ToggleLabel>
            </Styled.ListLabel>
          </Styled.ListItem>
          {!!editorMode && (
            <Styled.ListItem>
              <Styled.ListButton
                onClick={() => openModal("NewStep")}
                copy="Add a phase"
              />
            </Styled.ListItem>
          )}
        </Styled.InnerControlWrapper>
      </Styled.List>
    </Styled.Nav>
  );
};
