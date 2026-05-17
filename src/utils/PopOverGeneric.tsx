import { Popover, type PopoverOrigin } from "@mui/material";

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  anchorOrigin?: PopoverOrigin;
}

const PopOverGeneric = ({
  children,
  open,
  anchorEl,
  handleClose,
  anchorOrigin = { horizontal: "center", vertical: "bottom" },
}: Props) => {
  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
    >
      {children}
    </Popover>
  );
};

export default PopOverGeneric;
