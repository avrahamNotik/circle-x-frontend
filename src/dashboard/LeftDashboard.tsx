import styled from '@emotion/styled'
import { Gamepad } from 'lucide-react'

const LeftDashboard = () => {
 return (
  <LeftSideDashboard>
   <StyledGamepade />
   <span>TicTac</span>
   <span>Toe</span>
  </LeftSideDashboard>
 )
}

export default LeftDashboard

const LeftSideDashboard = styled.section`
font-size: 1.5em;
font-weight: 900;
justify-content: center;
& span:nth-child(2){
 color: white;

}
& span:nth-child(3){
 color: rgb(59 130 246);

}
`
const StyledGamepade = styled(Gamepad)`
color: rgb(59 130 246);
border-radius: 25%;
margin-inline: 1rem;
height: 4.5rem;
width: 4.5rem;
`