import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";

export const ErrorElement = styled.p`
  color: var(--impact);
  margin-bottom: 0;
  text-align: center;
  &:focus {
    text-decoration: underline;
  }
`;

export const useError = () => {
  const [error, setErrorText] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const setError = useCallback((error: string) => {
    setErrorText(error);
    if (error && ref.current) {
      ref.current.focus();
    }
  }, []);

  const ErrorText = useMemo(() => {
    return (
      <ErrorElement tabIndex={!!error ? 0 : -1} ref={ref}>
        {error}
      </ErrorElement>
    );
  }, [error]);

  return { ErrorText, setError };
};
