import styled from "@emotion/styled";
import { Gamepad } from "lucide-react";

const LeftDashboard = () => {
  return (
    <LeftSideDashboard>
      <StyledGamepade />
      <First>TicTac</First>
      <Second>Toe</Second>
    </LeftSideDashboard>
  );
};

export default LeftDashboard;

const LeftSideDashboard = styled.section`
  font-size: 1.5em;
  font-weight: 900;
  justify-content: center;
`;
const StyledGamepade = styled(Gamepad)`
  color: rgb(59 130 246);
  border-radius: 25%;
  margin-inline: 1rem;
  height: 4.5rem;
  width: 4.5rem;
  display: flex;
  gap: 0.3rem;
`;

const First = styled.span`
  color: white;
`;

const Second = styled.span`
  color: rgb(59 130 246);
`;
