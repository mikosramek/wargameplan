import { useCallback } from "react";
import { IS_DEV } from "utils/config";

export const useLog = () => {
  const log = useCallback(
    (...toLog: any) => {
      if (!IS_DEV) return;
      console.log(
        "%c DEV LOG ",
        "background: #efe; color: #080; border: 1px solid #080;",
        ...toLog
      );
    },
    [IS_DEV]
  );

  const error = useCallback(
    (...toLog: any) => {
      if (!IS_DEV) return;
      console.error(
        "%c DEV ERROR ",
        "background: #fee; color: #800; border: 1px solid #800;",
        ...toLog
      );
    },
    [IS_DEV]
  );

  return { log, error };
};
