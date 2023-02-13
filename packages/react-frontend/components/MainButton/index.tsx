import * as Styled from "./MainButton.styled";

export type Props = {
  onClick?: () => void;
  copy: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "submit" | "reset" | "button";
};

export const MainButton = ({
  onClick,
  copy,
  className = "",
  disabled = false,
  ariaLabel = copy,
  type = "submit",
}: Props) => {
  return (
    <Styled.Button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {copy}
    </Styled.Button>
  );
};
