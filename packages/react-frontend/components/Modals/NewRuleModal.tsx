import { useCallback } from "react";
import * as Styled from "./NewRuleModal.styled";

const NewRuleModal = () => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);
  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Label htmlFor="name">Rule Name:</Styled.Label>
      <Styled.Input type="text" id="name" name="name" />
      <Styled.Label htmlFor="text">Rule Text:</Styled.Label>
      <Styled.TextArea name="text" id="text"></Styled.TextArea>
      <Styled.Button type="submit">Submit</Styled.Button>
    </Styled.Form>
  );
};

export default NewRuleModal;
