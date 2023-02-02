import LayoutWrapper from "@components/LayoutWrapper";
import { SignupForm } from "@account/SignupForm";
import { useHeading } from "hooks/useHeading";

export default function Signup() {
  useHeading({ heading: "WarGameplan" });
  return (
    <LayoutWrapper>
      <SignupForm />
    </LayoutWrapper>
  );
}
