import { useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@utils/config";
import { useAccountStore } from "store/account";
import { ArmySteps, UnParsedArmy } from "store/armies";

export const ENDPOINTS = {
  getters: {
    account: "/v1/accounts",
    armies: "/v1/<accountId>/armies",
    army: "/v1/steps/<armyId>",
  },
  posters: {
    account: "/v1/accounts/create",
    armies: "/v1/<accountId>/armies/create",
    rule: "/v1/rules/create",
  },
  deleters: {
    rule: "/v1/rules/remove",
  },
};
type urlGetterType = keyof typeof ENDPOINTS.getters;
type urlPosterType = keyof typeof ENDPOINTS.posters;

type LoginResponse = { id: string; email: string; approved: boolean };

export const useApi = () => {
  const accountId = useAccountStore((state) => state.accountId);
  //   const session = useAccountStore((state) => state.session);
  const getGetterUrl = useCallback(
    (type: urlGetterType) => {
      let url = `${API_BASE}${ENDPOINTS.getters[type]}`;
      if (accountId) url = url.replace(/<accountId>/gi, accountId);
      return url;
    },
    [accountId]
  );

  const getPosterUrl = useCallback(
    (type: urlPosterType) => {
      let url = `${API_BASE}${ENDPOINTS.posters[type]}`;
      if (accountId) url = url.replace(/<accountId>/gi, accountId);
      return url;
    },
    [accountId]
  );

  const getArmies = useCallback(() => {
    const url = getGetterUrl("armies");
    return new Promise<UnParsedArmy[] | Error>((res, rej) => {
      axios
        .get(url, { headers: { accountId } })
        .then(({ data }) => res(data))
        .catch(rej);
    });
  }, [getGetterUrl]);

  const getArmySteps = useCallback(
    (armyId: string) => {
      if (!accountId) return null;
      const url = getGetterUrl("army").replace(/<armyId>/gi, armyId);
      return new Promise<ArmySteps[] | Error>((res, rej) => {
        axios
          .get(url, { headers: { accountId } })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getGetterUrl, accountId]
  );

  type postNewRuleProps = {
    armyId: string;
    stepId: string;
    name: string;
    text: string;
  };
  const postNewRule = useCallback(
    ({ armyId, stepId, name, text }: postNewRuleProps) => {
      const url = `${API_BASE}${ENDPOINTS.posters.rule}`;
      return new Promise<ArmySteps[] | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .post(url, { name, text, armyId, stepId }, { headers: { accountId } })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getPosterUrl, accountId]
  );

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const url = getGetterUrl("account");
      return new Promise<LoginResponse | Error>((res, rej) => {
        axios
          .get(url, { params: { email, password }, headers: {} })
          .then((response) => {
            res(response.data);
          })
          .catch(rej);
      });
    },
    [getGetterUrl]
  );

  return {
    login,
    getters: { getArmies, getArmySteps },
    posters: { postNewRule },
  };
};
