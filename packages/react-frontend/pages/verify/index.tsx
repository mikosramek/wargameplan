import LayoutWrapper from "components/LayoutWrapper";
import { useHeading } from "hooks/useHeading";

export default function Verify() {
  useHeading({ heading: "WarGameplan" });
  return (
    <LayoutWrapper>
      <h1>Verify</h1>
    </LayoutWrapper>
  );
}
