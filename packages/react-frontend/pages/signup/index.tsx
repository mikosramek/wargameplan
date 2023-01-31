import LayoutWrapper from "@components/LayoutWrapper";
import { SignupForm } from "@account/SignupForm";
import { useHeading } from "hooks/useHeading";

export default function Signup() {
  useHeading({ heading: "Warhammer Gameplan" });
  return (
    <LayoutWrapper>
      <SignupForm />
    </LayoutWrapper>
  );
}
