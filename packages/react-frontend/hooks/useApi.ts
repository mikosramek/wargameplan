import { useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@utils/config";
import { useAccountStore } from "store/account";
import { UnParsedArmy } from "store/armies";

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
type urlGetterType = keyof typeof ENDPOINTS.getters;

type LoginResponse = { id: string; email: string; approved: boolean };

export const useApi = () => {
  const accountId = useAccountStore((state) => state.accountId);
  //   const session = useAccountStore((state) => state.session);
  const getUrl = useCallback(
    (type: urlGetterType) => {
      let url = ENDPOINTS.getters[type];
      if (accountId)
        url = `${API_BASE}${url.replace(/<accountId>/gi, accountId)}`;
      console.log({ url, accountId });
      return url;
    },
    [accountId]
  );

  const getArmies = useCallback(() => {
    const url = getUrl("armies");
    return new Promise<UnParsedArmy[] | Error>((res, rej) => {
      axios
        .get(url)
        .then(({ data }) => res(data))
        .catch(rej);
    });
  }, [getUrl]);

  // "id": "63a36abddb4e21bcf787af0a",
  //  "name": "Setup",
  //  "order": 0
  const getSteps = useCallback((armyId: string) => {}, []);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const url = getUrl("account");
      return new Promise<LoginResponse | Error>((res, rej) => {
        axios
          .get(url, { params: { email, password }, headers: {} })
          .then((response) => {
            res(response.data);
          })
          .catch(rej);
      });
    },
    [getUrl]
  );

  return { login, getArmies };
};
