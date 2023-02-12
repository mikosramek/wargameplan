import { useRouter } from "next/router";
import LayoutWrapper from "components/LayoutWrapper";
import { useHeading } from "hooks/useHeading";

import * as Styled from "./verify.styled";
import { useCallback, useEffect, useState } from "react";
import { MainButton } from "components/MainButton";
import { useApi } from "hooks/useApi";
import { useLog } from "hooks/useLog";
import { useAccountStore } from "store/account";

export default function Verify() {
  const router = useRouter();
  useHeading({ heading: "WarGameplan" });
  const updateAsVerified = useAccountStore((state) => state.updateAsVerified);
  const { verification } = useApi();
  const [code, setCode] = useState<null | string>(null);
  const { error } = useLog();

  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      setCode(code as string);
    }
  }, [router]);

  useEffect(() => {
    if (code) {
      verification
        .verifyCheck({ code })
        .then((response) => {
          if (!(response instanceof Error) && response) {
            updateAsVerified();
            router.push("/armies");
          }
        })
        .catch((err) => {
          error(err);
        });
    }
  }, [code, verification]);

  const sendEmail = useCallback(() => {
    verification
      .verifyEmail()
      .then((response) => {
        if (!(response instanceof Error)) {
          setEmailSent(true);
        }
      })
      .catch((err) => error(err));
  }, []);

  return (
    <LayoutWrapper>
      <Styled.Wrapper>
        {!code && (
          <>
            <Styled.Title>Verify your account to continue</Styled.Title>
            <Styled.Copy>
              You'll have to verify your account to start creating plans.
            </Styled.Copy>
            {emailSent ? (
              <Styled.Copy>
                Check your email for a verification link.
              </Styled.Copy>
            ) : (
              <MainButton
                copy="Send a verification email"
                onClick={sendEmail}
              />
            )}
          </>
        )}
        {!!code && (
          <>
            <Styled.Title>Verifying account...</Styled.Title>
            <Styled.Copy>Please hold on...</Styled.Copy>
          </>
        )}
      </Styled.Wrapper>
    </LayoutWrapper>
  );
}
