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
    step: "/v1/steps/remove",
    army: "/v1/armies/remove",
  },
  patch: {
    step: "/v1/steps/order",
    rule: "/v1/rules/order",
  },
};
type urlGetterType = keyof typeof ENDPOINTS.get;
type urlPosterType = keyof typeof ENDPOINTS.post;
type urlDeleteType = keyof typeof ENDPOINTS.delete;
type urlPatchType = keyof typeof ENDPOINTS.patch;

type LoginResponse = {
  account: { id: string; sessionId: string; approved: boolean };
  expired: boolean;
};

export type Direction = -1 | 1;

type movedStep = {
  id: string;
  order: number;
};

export type reorderStepResponse = {
  armyId: string;
  movedStep: movedStep;
  shiftedStep: movedStep;
};

export const useApi = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const sessionId = useAccountStore((state) => state.session); // TODO: some sort of session validation
  const { currentArmyId, currentStepId } = useArmiesStore((state) => ({
    currentArmyId: state.currentArmyId,
    currentStepId: state.currentStepId,
  }));

  const headers = { accountId, sessionId };

  const getGetUrl = (type: urlGetterType) =>
    `${API_BASE}${ENDPOINTS.get[type]}`;

  const getPostUrl = (type: urlPosterType) =>
    `${API_BASE}${ENDPOINTS.post[type]}`;

  const getDeleteUrl = (type: urlDeleteType) =>
    `${API_BASE}${ENDPOINTS.delete[type]}`;

  const getPatchUrl = (type: urlPatchType) =>
    `${API_BASE}${ENDPOINTS.patch[type]}`;

  const getArmies = useCallback(() => {
    const url = getGetUrl("armies");
    return new Promise<UnParsedArmy[] | Error>((res, rej) => {
      axios
        .get(url, { headers })
        .then(({ data }) => res(data))
        .catch(rej);
    });
  }, [getGetUrl, headers]);

  const postNewArmy = useCallback(
    (armyName: string) => {
      const url = getPostUrl("armies");
      return new Promise<UnParsedArmy | Error>((res, rej) => {
        axios
          .post(url, { name: armyName }, { headers })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [getPostUrl, headers]
  );

  type removedArmyResponse = {
    armyId: string;
  };

  const deleteArmy = useCallback(
    (armyId: string) => {
      const url = getDeleteUrl("army");
      return new Promise<removedArmyResponse | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .delete(url, {
            headers,
            data: { armyId },
          })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [currentArmyId, headers]
  );

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
    [accountId, headers]
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
    [accountId, currentArmyId, headers]
  );

  type removedStepResponseType = {
    armyId: string;
    stepIdRemoved: string;
  };
  const deleteStep = useCallback(
    (stepId: string) => {
      const url = getDeleteUrl("step");
      return new Promise<removedStepResponseType | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .delete(url, {
            headers,
            data: { stepId, armyId: currentArmyId },
          })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [currentArmyId, headers]
  );

  const reorderStep = useCallback(
    (stepId: string, direction: Direction) => {
      const url = getPatchUrl("step");
      return new Promise<reorderStepResponse | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .patch(url, { stepId, armyId: currentArmyId, direction }, { headers })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [currentArmyId, headers]
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
    [accountId, headers]
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
    [accountId, headers, currentStepId, currentArmyId]
  );

  const reorderRule = useCallback(
    (ruleId: string, direction: Direction) => {
      const url = getPatchUrl("rule");
      return new Promise<ruleResponseType | Error | null>((res, rej) => {
        if (!accountId) return null;
        axios
          .patch(
            url,
            { stepId: currentStepId, ruleId, direction, armyId: currentArmyId },
            { headers }
          )
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    [accountId, headers, currentStepId, currentArmyId]
  );

  const signUp = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const url = getPostUrl("account");
      return new Promise<LoginResponse | Error>((res, rej) => {
        axios
          .post(url, { email, password })
          .then(({ data }) => res(data))
          .catch(rej);
      });
    },
    []
  );

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const url = getGetUrl("account");
      return new Promise<LoginResponse | Error>((res, rej) => {
        axios
          .get(url, { params: { email, password }, headers: {} })
          .then(({ data }) => {
            res(data);
          })
          .catch(rej);
      });
    },
    []
  );

  const sessionLogin = useCallback(({ sessionId }: { sessionId: string }) => {
    const url = getGetUrl("account");
    return new Promise<LoginResponse | Error>((res, rej) => {
      axios
        .get(url, { params: { sessionId }, headers: {} })
        .then(({ data }) => {
          res(data);
        })
        .catch(rej);
    });
  }, []);

  return {
    account: { sessionLogin, signUp, login },
    getters: { getArmies, getArmySteps },
    posters: { postNewArmy, postNewStep, postNewRule },
    deleters: { deleteArmy, deleteStep, deleteRule },
    patchers: { reorderStep, reorderRule },
  };
};
