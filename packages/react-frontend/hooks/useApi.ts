import { useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@utils/config";
import { useAccountStore } from "store/account";
import {
  ArmyRule,
  ArmySteps,
  UnParsedArmy,
  useArmiesStore,
} from "store/armies";

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
type urlDeleteType = keyof typeof ENDPOINTS.delete;

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

  const getDeleteUrl = useCallback((type: urlDeleteType) => {
    return `${API_BASE}${ENDPOINTS.delete[type]}`;
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
  type newStepResponse = {
    armyId: string;
    step: {
      id: string;
      name: string;
      order: number;
      rules: ArmyRule[];
    };
  };
  const postNewStep = useCallback(
    ({ stepName }: postNewStepProps) => {
      const url = getPostUrl("step");
      return new Promise<newStepResponse | Error | null>((res, rej) => {
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
    name: string;
    text: string;
  };
  type ruleResponseType = {
    stepId: string;
    rules: ArmyRule[];
  };
  const postNewRule = useCallback(
    ({ name, text }: postNewRuleProps) => {
      const url = getPostUrl("rule");
      return new Promise<ruleResponseType | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .post(
            url,
            { name, text, armyId: currentArmyId, stepId: currentStepId },
            { headers }
          )
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getPostUrl, accountId]
  );

  const deleteRule = useCallback(
    (ruleId: string) => {
      const url = getDeleteUrl("rule");
      return new Promise<ruleResponseType | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .delete(url, {
            headers,
            data: { stepId: currentStepId, ruleId, armyId: currentArmyId },
          })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getDeleteUrl, accountId]
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
    deleters: { deleteRule },
  };
};
