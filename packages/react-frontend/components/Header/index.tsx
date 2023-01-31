import { MainButton } from "@components/MainButton";
import { useAccountStore } from "@store/account";
import { useGeneralStore } from "@store/general";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import * as Styled from "./Header.styled";

const Header = () => {
  const heading = useGeneralStore((state) => state.heading);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const logout = useAccountStore((state) => state.logout);
  const router = useRouter();

  const handleSignout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout]);

  return (
    <Styled.Header>
      <Styled.InnerHeading>
        <Styled.Heading>{heading}</Styled.Heading>
        <div>
          {!isLoggedIn && (
            <>
              <Link href="/signup" passHref legacyBehavior>
                <Styled.StyledLink isActive={router.pathname === "/signup"}>
                  Sign up
                </Styled.StyledLink>
              </Link>
              <Link href="/" passHref legacyBehavior>
                <Styled.StyledLink isActive={router.pathname === "/"}>
                  Log in
                </Styled.StyledLink>
              </Link>
            </>
          )}
          {!!isLoggedIn && (
            <MainButton onClick={handleSignout} copy="Sign out" />
          )}
        </div>
      </Styled.InnerHeading>
    </Styled.Header>
  );
};

export default Header;
