import LayoutWrapper from "@components/LayoutWrapper";
import { LoginForm } from "@account/LoginForm";

export default function Home() {
  return (
    <LayoutWrapper>
      <h1>Warhammer Gameplan</h1>
      <LoginForm />
    </LayoutWrapper>
  );
}
