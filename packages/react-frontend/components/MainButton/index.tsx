import * as Styled from "./MainButton.styled";

type Props = {
  onClick?: () => void;
  copy: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export const MainButton = ({
  onClick,
  copy,
  className = "",
  disabled = false,
  ariaLabel = copy,
}: Props) => {
  return (
    <Styled.Button
      type="submit"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {copy}
    </Styled.Button>
  );
};
