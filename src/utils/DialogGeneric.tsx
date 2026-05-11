import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
const DialogGeneric = ({ children, open, onClose }: Props) => {
  return (
    <Dialog maxWidth={false} open={open} onClose={onClose}>
      <OutOfDialog>
        <IconButton title="cancle" onClick={onClose}>
          <X />
        </IconButton>
      </OutOfDialog>
      {children}
    </Dialog>
  );
};

export default DialogGeneric;

const OutOfDialog = styled.div`
  border: 1px solid rgb(233, 233, 233);
  min-height: 1rem;
  min-width: 1rem;
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`;
