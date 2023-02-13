import { Props as BaseProps } from "components/MainButton";
import * as Styled from "./ModalButton.styled";

type Props = {} & BaseProps;

export const ModalButton = ({ ...props }: Props) => {
  return <Styled.Button {...props} />;
};
