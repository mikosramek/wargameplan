import { Army } from "store/armies";
import Link from "next/link";

import * as Styled from "./ArmyPreview.styled";
import useArmies from "hooks/useArmies";
import { useCallback } from "react";

type Props = {
  id: string;
  army: Army;
};

const ArmyPreview = ({ id, army }: Props) => {
  const { deleteArmy } = useArmies();

  const handleDelete = useCallback(() => {
    confirm(`Delete the ${army.name} army?`) ? deleteArmy(id) : null;
  }, [army.name, deleteArmy, id]);

  return (
    <Styled.Wrapper>
      <Link href={`armies/${id}`} passHref legacyBehavior>
        <Styled.StyledLink>
          <Styled.Heading>{army.name}</Styled.Heading>
        </Styled.StyledLink>
      </Link>
      <Styled.DeleteButton onClick={handleDelete} copy="Delete army" />
    </Styled.Wrapper>
  );
};

export default ArmyPreview;
