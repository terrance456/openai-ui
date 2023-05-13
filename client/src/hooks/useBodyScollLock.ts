export const useBodyScrollLock = () => {
  const toggleBodyOverflow = (value: boolean) => {
    if (value) {
      document.body.classList.add("disable-scroll");
      return;
    }
    document.body.classList.remove("disable-scroll");
  };

  return { toggleBodyOverflow };
};
