import { useState } from "react";

type Props = {
  initialCount?: number;
  maxCount: number;
};

const useCounter = ({ initialCount = 0, maxCount }: Props) => {
  const [counter, setCounter] = useState(initialCount);

  const increaseCounter = () => {
    setCounter((previous) => {
      if (counter >= maxCount) {
        return 0;
      }
      return previous + 1;
    });
  };

  const decreaseCounter = () => {
    setCounter((previous) => {
      if (counter <= 0) {
        return maxCount;
      }
      return previous - 1;
    });
  };

  return { counter, increaseCounter, decreaseCounter };
};

export default useCounter;
