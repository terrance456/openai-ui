import React from "react";
import { useDebouncedCallback } from "use-debounce";

export const useWindowScrollend = (callBack: () => void, isLoading?: boolean) => {
  const onScroll = (event: Event) => {
    const container = (event.target as Document).body;
    const { clientHeight, scrollHeight } = container;

    if (isLoading) {
      return;
    }

    if (clientHeight + scrollY + 150 >= scrollHeight) {
      callBack();
    }
  };

  const debounceScroll = useDebouncedCallback(onScroll, 300);

  React.useEffect(() => {
    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [debounceScroll]);
};
