import styles from "./index.module.scss";

type Props = {
  onClick?: () => void;
  copy: string;
};

export const MainButton = ({ onClick, copy }: Props) => {
  return (
    <button type="submit" className={styles.Button} onClick={onClick}>
      {copy}
    </button>
  );
};
