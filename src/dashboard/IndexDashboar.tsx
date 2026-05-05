import styled from '@emotion/styled'
import { Settings } from 'lucide-react'
import { IconButton, Tooltip } from '@mui/material'
import LeftDashboard from './LeftDashboard'
import MiddleDashboard from './MiddleDashboard';
import SoundButton from './SoundButton';
import { useGenericQuery } from '../query/useGenericQuery';
import { getMe } from '../api/auto';
import { queryKeys } from '../query/kueryeKeys';
import PopOverGeneric from '../utils/PopOverGeneric';
import { useState } from 'react';
import useOnClickPopOver from '../utils/useOnClickPopOver';

const IndexDashboar = () => {
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const { handleClick } = useOnClickPopOver({ setAnchorEl })
 const openLogin = Boolean(anchorEl);
 const { data: player, isLoading } = useGenericQuery({ queryKey: [queryKeys.me], queryFn: getMe })
 const name = {
  firstName: 'avraham',
  lastName: 'notik'
 }

 const id = openLogin ? 'simple-popover' : undefined;
 function shrtName(firstName: string, lastName: string) {
  const short = firstName[0].toUpperCase() + lastName[0].toUpperCase()
  return short
 }
 if (isLoading) return <div>is loading...</div>
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
    <SoundButton />
    <DividerLine />
    <CircleConection aria-describedby={id}
     onClick={handleClick}
    >{player ? shrtName(name.firstName, name.lastName) : 'Login'}</CircleConection>
   </RightDashboard>
   <PopOverGeneric anchorEl={anchorEl} open={openLogin} handleClose={() => setAnchorEl(null)} >
    <div>dfvasdbkh</div>
   </PopOverGeneric>
  </DashBoardStyled>
 )
}

export default IndexDashboar

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

> *{
 display: flex;
 align-items: center;

}
`

const RightDashboard = styled.div`
gap: 2rem;
 
`
const DividerLine = styled.div`
 height: 2.2rem;
 width: 1px;
 background: rgba(255, 255, 255, 0.1);
`
const CircleConection = styled.div`
 height: 2.7rem;
 width: 2.7rem;
 border-radius: 50%;
 border:2px solid rgb(59 130 246);
 display: grid;
 place-items:center;
 color: rgb(59 130 246);
 cursor: pointer;

`