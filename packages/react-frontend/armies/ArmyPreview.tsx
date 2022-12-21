import { Army } from "store/armies";
import Link from "next/link";

type Props = {
  id: string;
  army: Army;
};

const ArmyPreview = ({ id, army }: Props) => {
  return (
    <Link href={`armies/${id}`}>
      <article>
        <h2>{army.name}</h2>
      </article>
    </Link>
  );
};

export default ArmyPreview;
