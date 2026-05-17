import styled from "@emotion/styled";
import { Zap } from "lucide-react";

const HomePage = () => {
  return (
    <Page>
      <LiveUsers>
        <Zap style={{ transform: "rotate(190deg)" }} fill="rgb(139 92 246)" />
        <span>Secseon 5 in live</span>
      </LiveUsers>
    </Page>
  );
};

export default HomePage;

const Page = styled.div`
  width: 100%;
  height: 100vh;
`;

const LiveUsers = styled.div`
  font-weight: 600;
  font-size: 1em;
  background: rgb(30 41 59);
  color: rgb(139 92 246);
  padding: 0.5rem 1rem;
  margin: 10rem auto;
  height: 1.25rem;
  width: 10rem;
  border-radius: 999px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
