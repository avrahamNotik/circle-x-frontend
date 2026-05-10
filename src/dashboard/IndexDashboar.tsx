import styled from "@emotion/styled";
import { Settings } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";
import LeftDashboard from "./LeftDashboard";
import MiddleDashboard from "./MiddleDashboard";
import SoundButton from "./SoundButton";
import { useGenericQuery } from "../query/useGenericQuery";
import { getMe } from "../api/auto";
import { queryKeys } from "../query/kueryeKeys";
import PopOverGeneric from "../utils/PopOverGeneric";
import { useState } from "react";
import useOnClickPopOver from "../utils/useOnClickPopOver";
import DialogGeneric from "../utils/DialogGeneric";
import { signUpField, signUpSchema } from "../signUp/formSetting";
import IndexForm from "../signUp/IndexForm";

const IndexDashboar = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleClick: openDitelsForLoginUser } = useOnClickPopOver({
    setAnchorEl,
  });
  const openLogin = Boolean(anchorEl);
  const { data: player, isLoading } = useGenericQuery({
    queryKey: [queryKeys.me],
    queryFn: getMe,
  });
  const name = {
    firstName: "avraham",
    lastName: "notik",
  };

  const id = openLogin ? "simple-popover" : undefined;
  function shrtName(firstName: string, lastName: string) {
    const short = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    return short;
  }
  if (isLoading) return <div>is loading...</div>;
  return (
    <DashBoardStyled>
      <LeftDashboard />
      <MiddleDashboard />
      <RightDashboard>
        <Tooltip title="Setting">
          <IconButton
            sx={{
              background: "rgb(30 41 59)",
              transition: "0.5s",
              "&:hover": {
                color: "rgb(209 213 219)",
                background: "rgb(51 65 85)",
              },
            }}
          >
            <Settings />
          </IconButton>
        </Tooltip>
        <SoundButton />
        <DividerLine />
        <CircleConection
          $isConected={!!player}
          aria-describedby={id}
          onClick={() =>
            player ? openDitelsForLoginUser : setOpenLoginDialog(true)
          }
        >
          {player
            ? shrtName(name.firstName, name.lastName)
            : "Sign in/ Sign Up"}
        </CircleConection>
      </RightDashboard>
      <PopOverGeneric
        anchorEl={anchorEl}
        open={openLogin}
        handleClose={() => setAnchorEl(null)}
      >
        <div>UserLogin</div>
      </PopOverGeneric>
      <DialogGeneric
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
      >
        <IndexForm
          title="Sign up"
          fields={signUpField}
          onSubmit={(data) => console.log({ data })}
          schema={signUpSchema}
          defaultValues={{
            birthDay: undefined,
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          }}
          setOpenDialog={() => setOpenLoginDialog(false)}
        />
      </DialogGeneric>
    </DashBoardStyled>
  );
};

export default IndexDashboar;

const DashBoardStyled = styled.div`
  width: 100%;
  height: 5rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  > * {
    display: flex;
    align-items: center;
  }
`;

const RightDashboard = styled.div`
  gap: 2rem;
`;
const DividerLine = styled.div`
  height: 2.2rem;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
`;
const CircleConection = styled.div<{ $isConected: boolean }>`
  height: 2.7rem;
  width: ${({ $isConected }) => ($isConected ? "2.7rem" : "8rem")};
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
