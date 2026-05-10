import { IconButton, Slider, Tooltip } from "@mui/material";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import { useSoundStore } from "../store/soundStore";
import styled from "@emotion/styled";
import PopOverGeneric from "../utils/PopOverGeneric";
import useOnClickPopOver from "../utils/useOnClickPopOver";

const SoundButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSound = Boolean(anchorEl);
  const id = openSound ? "simple-popover" : undefined;

  const sound = useSoundStore((store) => store.volume);
  const setSound = useSoundStore((store) => store.setVolume);
  const playSound = useSoundStore((store) => store.playSound);
  const handleChange = (_event: Event, newValue: number) => {
    setSound(newValue);
  };

  const { handleClick } = useOnClickPopOver({
    setAnchorEl,
    trigerEvent: { eventName: "sound-button" },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip
        title="Sound Mute"
        onClick={() => {
          console.log("sgfasfd");
          window.umami?.track("sound-button");
        }}
      >
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            background: "rgb(30 41 59)",
            transition: "0.5s",
            "&:hover": {
              color: "rgb(209 213 219)",
              background: "rgb(51 65 85)",
            },
          }}
        >
          <Volume2 />
        </IconButton>
      </Tooltip>
      <PopOverGeneric
        anchorEl={anchorEl}
        open={openSound}
        handleClose={handleClose}
      >
        <SliderBox>
          <Slider
            aria-label="Volume"
            value={sound}
            onChange={handleChange}
            onChangeCommitted={() => playSound("click")}
          />
        </SliderBox>
      </PopOverGeneric>
    </>
  );
};

export default SoundButton;

const SliderBox = styled.div`
  padding: 0.5rem 1.5rem;
  width: 16rem;
  background: rgba(30, 41, 59, 0.7);
`;
