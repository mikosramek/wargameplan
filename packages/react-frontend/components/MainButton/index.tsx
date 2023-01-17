import * as Styled from "./MainButton.styled";

type Props = {
  onClick?: () => void;
  copy: string;
  className?: string;
};

export const MainButton = ({ onClick, copy, className = "" }: Props) => {
  return (
    <Styled.Button type="submit" className={className} onClick={onClick}>
      {copy}
    </Styled.Button>
  );
};
