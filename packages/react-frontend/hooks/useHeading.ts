import { useEffect } from "react";
import { useGeneralStore } from "store/general";

type Props = {
  heading: string;
};

export const useHeading = ({ heading }: Props) => {
  const setHeading = useGeneralStore((state) => state.setHeading);
  useEffect(() => {
    setHeading(heading);
  }, [heading]);
};
