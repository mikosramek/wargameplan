import { useGeneralStore } from "@store/general";
import { useEffect } from "react";

type Props = {
  heading: string;
};

export const useHeading = ({ heading }: Props) => {
  const setHeading = useGeneralStore((state) => state.setHeading);
  useEffect(() => {
    setHeading(heading);
  }, [heading]);
};
