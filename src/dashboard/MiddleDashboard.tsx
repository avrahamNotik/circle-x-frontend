import styled from '@emotion/styled'

const MiddleDashboard = () => {
 return (
  <MiddleSideDashboard>
   <span>Home</span>
   <span>History</span>
   <span>Leaderboard</span>
  </MiddleSideDashboard>
 )
}

export default MiddleDashboard

const MiddleSideDashboard = styled.div`
font-size: 1em;
font-weight: 600;
gap: 1rem;

span{
  color:rgb(209 213 219);
  transition:  0.3s ;
  &:hover{
   color:rgb(255 255 255);
  }
 }
`