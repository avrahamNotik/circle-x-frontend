import { Outlet } from 'react-router'
import styled from "@emotion/styled"
import IndexDashboar from '../dashboard/IndexDashboar';

const DashBoard = () => {
 return (
  <>
   <IndexDashboar />
   <MainDiv>
    <Outlet />
   </MainDiv>
  </>
 )
}


export default DashBoard


const MainDiv = styled.div`
min-height: 100vh;
margin-top: 5rem;
`
