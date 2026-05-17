interface Prpos {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  trigerEvent?: { eventName: string; data?: Record<string, unknown> };
}
const useOnClickPopOver = ({ setAnchorEl, trigerEvent }: Prpos) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (trigerEvent) {
      window.umami?.track(trigerEvent.eventName, trigerEvent.data);
    }
    setAnchorEl(event.currentTarget);
  };
  return { handleClick };
};

export default useOnClickPopOver;
