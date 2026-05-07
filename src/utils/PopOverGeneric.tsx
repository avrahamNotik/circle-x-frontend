import { Popover, type PopoverOrigin } from "@mui/material";

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  anchorOrigin?: PopoverOrigin | undefined;
}
import React from "react";

const PopOverGeneric = ({
  children,
  open,
  anchorEl,
  handleClose,
  anchorOrigin,
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
