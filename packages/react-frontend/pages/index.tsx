import LayoutWrapper from "components/LayoutWrapper";
import { LoginForm } from "account/LoginForm";
import { useHeading } from "hooks/useHeading";

export default function Home() {
  useHeading({ heading: "WarGameplan" });
  console.log(process.env);
  return (
    <LayoutWrapper>
      <LoginForm />
    </LayoutWrapper>
  );
}
