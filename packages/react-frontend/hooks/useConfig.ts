import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Flags, useConfigStore } from "store/config";
import { API_BASE } from "utils/config";
import { useLog } from "./useLog";

export const useConfig = () => {
  const fetched = useConfigStore((state) => state.fetched);
  const setFlags = useConfigStore((state) => state.setFlags);
  const { error } = useLog();

  const [flagsFetched, setFlagsFetched] = useState(false);

  const fetchFlags = useCallback(async () => {
    try {
      const newFlags = (await axios.get(`${API_BASE}/v1/features`))
        .data as Flags;
      setFlags(newFlags);
    } catch (err) {
      error(err);
    } finally {
      setFlagsFetched(true);
    }
  }, [setFlags]);

  useEffect(() => {
    if (!fetched) {
      fetchFlags();
    }
  }, [fetched, fetchFlags]);

  return flagsFetched;
};
