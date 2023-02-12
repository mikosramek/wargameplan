import LayoutWrapper from "components/LayoutWrapper";
import { SignupForm } from "account/SignupForm";
import { useHeading } from "hooks/useHeading";

export default function Signup() {
  useHeading({ heading: "WarGamePlanner" });
  return (
    <LayoutWrapper>
      <SignupForm />
    </LayoutWrapper>
  );
}
