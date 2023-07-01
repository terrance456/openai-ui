import React from "react";

export const useWindowScrollend = (callBack: () => void) => {
  React.useEffect(() => {
    const onScroll = (event: Event) => {
      const container = (event.target as Document).body;
      const { clientHeight, scrollHeight } = container;

      if (clientHeight + scrollY + 150 >= scrollHeight) {
        callBack();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callBack]);
};
