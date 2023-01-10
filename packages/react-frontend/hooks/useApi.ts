import { useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@utils/config";
import { useAccountStore } from "store/account";
import { ArmySteps, UnParsedArmy, useArmiesStore } from "store/armies";

export const ENDPOINTS = {
  get: {
    account: "/v1/accounts",
    armies: "/v1/armies",
    army: "/v1/steps/<armyId>",
  },
  post: {
    account: "/v1/accounts/create",
    armies: "/v1/armies/create",
    step: "/v1/steps/create",
    rule: "/v1/rules/create",
  },
  delete: {
    rule: "/v1/rules/remove",
  },
};
type urlGetterType = keyof typeof ENDPOINTS.get;
type urlPosterType = keyof typeof ENDPOINTS.post;

type LoginResponse = { id: string; email: string; approved: boolean };

export const useApi = () => {
  const accountId = useAccountStore((state) => state.accountId);
  //   const session = useAccountStore((state) => state.session);
  const { currentArmyId, currentStepId } = useArmiesStore((state) => ({
    currentArmyId: state.currentArmyId,
    currentStepId: state.currentStepId,
  }));

  const headers = { accountId };

  const getGetUrl = useCallback((type: urlGetterType) => {
    return `${API_BASE}${ENDPOINTS.get[type]}`;
  }, []);

  const getPostUrl = useCallback((type: urlPosterType) => {
    return `${API_BASE}${ENDPOINTS.post[type]}`;
  }, []);

  const getArmies = useCallback(() => {
    const url = getGetUrl("armies");
    return new Promise<UnParsedArmy[] | Error>((res, rej) => {
      axios
        .get(url, { headers })
        .then(({ data }) => res(data))
        .catch(rej);
    });
  }, [getGetUrl]);

  const getArmySteps = useCallback(
    (armyId: string) => {
      if (!accountId) return null;
      const url = getGetUrl("army").replace(/<armyId>/gi, armyId);
      return new Promise<ArmySteps[] | Error>((res, rej) => {
        axios
          .get(url, { headers })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getGetUrl, accountId]
  );

  type postNewStepProps = {
    stepName: string;
  };
  const postNewStep = useCallback(
    ({ stepName }: postNewStepProps) => {
      const url = getPostUrl("step");
      return new Promise<ArmySteps[] | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .post(url, { name: stepName, armyId: currentArmyId }, { headers })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getPostUrl, accountId, currentArmyId]
  );

  type postNewRuleProps = {
    armyId: string;
    stepId: string;
    name: string;
    text: string;
  };
  const postNewRule = useCallback(
    ({ armyId, stepId, name, text }: postNewRuleProps) => {
      const url = getPostUrl("rule");
      return new Promise<ArmySteps[] | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .post(url, { name, text, armyId, stepId }, { headers })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getPostUrl, accountId]
  );

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const url = getGetUrl("account");
      return new Promise<LoginResponse | Error>((res, rej) => {
        axios
          .get(url, { params: { email, password }, headers: {} })
          .then((response) => {
            res(response.data);
          })
          .catch(rej);
      });
    },
    [getGetUrl]
  );

  return {
    login,
    getters: { getArmies, getArmySteps },
    posters: { postNewStep, postNewRule },
  };
};
