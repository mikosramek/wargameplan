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
        <Styled.InnerControlWrapper>
          <Styled.ListItem>
            <Styled.ListButton onClick={previousStep}>&#x3c;</Styled.ListButton>
          </Styled.ListItem>
          <Styled.ListItem>
            <Styled.ListButton onClick={nextStep}>&#x3e;</Styled.ListButton>
          </Styled.ListItem>
        </Styled.InnerControlWrapper>
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
          <Styled.ListItem>
            <Styled.ListButton
              onClick={() => openModal("NewStep")}
              disabled={!editorMode}
            >
              new phase
            </Styled.ListButton>
          </Styled.ListItem>
        </Styled.InnerControlWrapper>
      </Styled.List>
    </Styled.Nav>
  );
};
