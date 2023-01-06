import { useCallback, useState } from "react";

type Props = {
  initialCount?: number;
  maxCount: number;
};

const useCounter = ({ initialCount = 0, maxCount }: Props) => {
  const [counter, setCounter] = useState(initialCount);

  const increaseCounter = useCallback(() => {
    if (counter >= maxCount) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }, [counter, setCounter]);

  const decreaseCounter = useCallback(() => {
    if (counter <= 0) {
      setCounter(maxCount);
    } else {
      setCounter(counter - 1);
    }
  }, [counter, setCounter]);

  return { counter, increaseCounter, decreaseCounter };
};

export default useCounter;
