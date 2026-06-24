import styled from "@emotion/styled";
import { LoaderCircle } from "lucide-react";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
`;

export const LoadingSircle = styled(LoaderCircle)`
  animation: ${spin} 1s linear infinite;
`;
