import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { MainButton } from "components/MainButton";
import { useAccountStore } from "store/account";
import { useGeneralStore } from "store/general";
import { clearStoredSession } from "utils/general";
import * as Styled from "./Header.styled";

const Header = () => {
  const heading = useGeneralStore((state) => state.heading);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const logout = useAccountStore((state) => state.logout);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignout = useCallback(() => {
    logout();
    clearStoredSession();
    router.push("/");
  }, [logout, router]);

  return (
    <Styled.Header>
      <Styled.InnerHeading>
        <Styled.Heading>{heading}</Styled.Heading>
        <div>
          {!isLoggedIn && (
            <>
              <Link href="/signup" passHref legacyBehavior>
                <Styled.StyledLink isActive={pathname === "/signup"}>
                  Sign up
                </Styled.StyledLink>
              </Link>
              <Link href="/" passHref legacyBehavior>
                <Styled.StyledLink isActive={pathname === "/"}>
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
