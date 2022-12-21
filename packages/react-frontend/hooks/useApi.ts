import { useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@utils/config";

export const ENDPOINTS = {
  getters: {
    account: "/v1/accounts",
    armies: "/v1/<accountId>/armies",
  },
  creators: {
    account: "/v1/accounts/create",
    armies: "/v1/<accountId>/armies/create",
  },
};
type UrlType = keyof typeof ENDPOINTS.getters;

type Api = {
  accountId: string | null;
  session: string | null;
};

export const useApi = ({ accountId, session }: Api) => {
  const parseType = useCallback(
    (type: UrlType) => {
      let url = `${API_BASE}${ENDPOINTS.getters[type]}`;
      if (accountId) url = url.replace(/<accountId/gi, accountId);
      return url;
    },
    [accountId]
  );
  const get = useCallback(
    (type: UrlType, params?: Record<string, any>) => {
      const url = parseType(type);
      return new Promise((res, rej) => {
        axios
          .get(url, { params, headers: {} })
          .then((response) => {
            res(response.data);
          })
          .catch(rej);
      });
    },
    [accountId, session]
  );

  return { get };
};
