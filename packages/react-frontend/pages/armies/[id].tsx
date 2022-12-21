import LayoutWrapper from "@components/LayoutWrapper";
import { useRouter } from "next/router";
import { useArmiesStore } from "store/armies";

const ArmyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const army = useArmiesStore((state) => state.getArmy)(id as string);

  return (
    <LayoutWrapper>
      <h1>{army.name}</h1>
    </LayoutWrapper>
  );
};

export default ArmyPage;
