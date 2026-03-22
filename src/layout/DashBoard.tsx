import { Outlet } from 'react-router'
import styled from "@emotion/styled"

const DashBoard = () => {
 return (
  <div style={{ marginTop: '2rem' }}>
   <DashBoardStyled>

   </DashBoardStyled>
   <Outlet />
  </div>
 )
}


export default DashBoard

const DashBoardStyled = styled.div`
width: 100%;
height: 2rem;
background: rgba(25, 23, 23, 0.75);
position:fixed;
top: 0;
left: 0;
z-index: 100;
backdrop-filter: blur(8px);

`