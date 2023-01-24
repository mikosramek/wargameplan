import { Army } from "store/armies";
import Link from "next/link";

import * as Styled from "./ArmyPreview.styled";

type Props = {
  id: string;
  army: Army;
};

const ArmyPreview = ({ id, army }: Props) => {
  return (
    <Styled.Wrapper>
      <Link href={`armies/${id}`} passHref legacyBehavior>
        <Styled.StyledLink>
          <Styled.Heading>{army.name}</Styled.Heading>
        </Styled.StyledLink>
      </Link>
      <Styled.DeleteButton copy="Delete army" />
    </Styled.Wrapper>
  );
};

export default ArmyPreview;
