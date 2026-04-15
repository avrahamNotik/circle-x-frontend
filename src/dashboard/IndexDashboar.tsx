import styled from '@emotion/styled'
import { Settings, Volume2 } from 'lucide-react'
import { IconButton, Popover, Slider, Tooltip } from '@mui/material'
import { useState } from 'react';
import LeftDashboard from './LeftDashboard'
import MiddleDashboard from './MiddleDashboard';
import { useSoundStore } from '../store/soundStore';

const IndexDashboar = () => {
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const sound = useSoundStore((store) => store.volume)
 const setSound = useSoundStore((store) => store.setVolume)
 const playSound = useSoundStore((store) => store.playSound)
 const openSound = Boolean(anchorEl);
 const id = openSound ? 'simple-popover' : undefined;

 const handleChange = (_event: Event, newValue: number) => {
  setSound(newValue);
 };

 const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };

 return (
  <DashBoardStyled>
   <LeftDashboard />
   <MiddleDashboard />
   <RightDashboard>
    <Tooltip title="Setting">
     <IconButton sx={{ background: 'rgb(30 41 59)', transition: '0.5s', '&:hover': { color: 'rgb(209 213 219)', background: 'rgb(51 65 85)' } }}>
      <Settings />
     </IconButton>
    </Tooltip>
    <Tooltip title="Sound Mute">
     <IconButton aria-label="more"
      aria-describedby={id}
      onClick={handleClick}
      sx={{ background: 'rgb(30 41 59)', transition: '0.5s', '&:hover': { color: 'rgb(209 213 219)', background: 'rgb(51 65 85)' } }} >
      <Volume2 />
     </IconButton>
    </Tooltip>
    <Popover
     id={id}
     open={openSound}
     anchorEl={anchorEl}
     onClose={handleClose}
     slotProps={{ paper: { sx: { borderRadius: '1rem' } } }}
     anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
     }}
    >
     <SliderBox>
      <Slider
       aria-label="Volume"
       value={sound}
       onChange={handleChange}
       onChangeCommitted={() => playSound('click')} />
     </SliderBox>
    </Popover>

   </RightDashboard>
  </DashBoardStyled>
 )
}

export default IndexDashboar

const DashBoardStyled = styled.div`
width: 100%;
height: 5rem;
background: rgba(30, 41, 59, 0.7);
font-family: sans-serif;
display: flex; 
align-items: center;
justify-content: center;
gap: 10rem;
position: fixed;
top: 0;
left: 0;
z-index: 100;

> *{
 display: flex;
 align-items: center;

}
`

const RightDashboard = styled.div`
gap: 2rem;
 
`
const SliderBox = styled.div`
padding: 0.5rem 1.5rem;
width: 16rem;
background: rgba(30, 41, 59, 0.7) ;
`
