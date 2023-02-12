import LayoutWrapper from "components/LayoutWrapper";
import { LoginForm } from "account/LoginForm";
import { useHeading } from "hooks/useHeading";

export default function Home() {
  useHeading({ heading: "WarGamePlanner" });
  return (
    <LayoutWrapper>
      <LoginForm />
    </LayoutWrapper>
  );
}
