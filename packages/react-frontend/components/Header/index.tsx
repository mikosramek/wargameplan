import { useGeneralStore } from "@store/general";
import * as Styled from "./Header.styled";
const Header = () => {
  const heading = useGeneralStore((state) => state.heading);
  return (
    <Styled.Header>
      <Styled.Heading>
        <Styled.InnerHeading>{heading}</Styled.InnerHeading>
      </Styled.Heading>
    </Styled.Header>
  );
};

export default Header;
