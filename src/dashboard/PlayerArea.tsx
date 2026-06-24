import styled from "@emotion/styled";
import { useGenericQuery } from "../query/useGenericQuery";
import { getMe } from "../api/auth";
import { useState } from "react";
import useOnClickPopOver from "../utils/useOnClickPopOver";
import IndexForm from "../signUp/IndexForm";
import PopOverGeneric from "../utils/PopOverGeneric";
import DialogGeneric from "../utils/DialogGeneric";
import UserArea from "./UserArea";
import { LoadingSircle } from "../utils/commonCss";

const PlayerArea = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleClick } = useOnClickPopOver({
    setAnchorEl,
  });

  const { data: player, isLoading } = useGenericQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const openLogin = Boolean(anchorEl);

  function shrtName(firstName: string, lastName: string) {
    const short = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    return short;
  }
  const onClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) return <LoadingSircle />;

  return (
    <>
      <CircleConection
        $isConected={!!player}
        onClick={player ? handleClick : () => setOpenLoginDialog(true)}
      >
        {player
          ? shrtName(player.data.firstName ?? "", player.data.lastName)
          : "Sign in/ Sign Up"}
        <DialogGeneric
          open={openLoginDialog}
          onClose={() => setOpenLoginDialog(false)}
        >
          <IndexForm setOpenDialog={() => setOpenLoginDialog(false)} />
        </DialogGeneric>
      </CircleConection>
      <PopOverGeneric
        anchorEl={anchorEl}
        open={openLogin}
        handleClose={onClose}
      >
        <UserArea onClose={onClose} />
      </PopOverGeneric>
    </>
  );
};

export default PlayerArea;

const CircleConection = styled.div<{ $isConected?: boolean }>`
  height: 2rem;
  width: ${({ $isConected }) => ($isConected ? "2.0rem" : "8rem")};
  padding: 0 0.5rem;
  border-radius: 1.3rem;
  border: 2px solid rgb(59 130 246);
  display: grid;
  place-items: center;
  color: rgb(59 130 246);
  cursor: pointer;
  :hover {
    color: rgb(37, 99, 235);
    border-color: rgb(37, 99, 235);
  }

  :active {
    color: rgb(29, 78, 216);
    border-color: rgb(29, 78, 216);
  }
`;
