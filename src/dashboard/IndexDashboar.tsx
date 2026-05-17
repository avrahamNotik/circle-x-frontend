import styled from "@emotion/styled";
import { Settings } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";
import LeftDashboard from "./LeftDashboard";
import MiddleDashboard from "./MiddleDashboard";
import SoundButton from "./SoundButton";
import PlayerArea from "./PlayerArea";

const IndexDashboar = () => {
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
        <PlayerArea />
      </RightDashboard>
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
