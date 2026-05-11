import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import GenericFormProvider from "./GenericFormProvider";
import {
  signInField,
  signInSchema,
  signUpField,
  signUpSchema,
} from "./formSetting";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

interface Props {
  setOpenDialog: () => void;
}
const IndexForm = ({ setOpenDialog }: Props) => {
  const [modeSign, setModeSign] = useState<Record<"mode", "signUp" | "signIn">>(
    { mode: "signUp" },
  );
  return (
    <SignUpDialog>
      <Typography variant="h5">
        {modeSign.mode === "signUp" ? "Sign up" : "Sign in"}ffff
      </Typography>
      {modeSign.mode === "signUp" ? (
        <GenericFormProvider
          fields={signUpField}
          onSubmit={(data) => console.log({ data })}
          schema={signUpSchema}
          defaultValues={{
            birthDay: undefined,
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          }}
          setOpenDialog={setOpenDialog}
        />
      ) : (
        <GenericFormProvider
          fields={signInField}
          onSubmit={(data) => console.log({ data })}
          schema={signInSchema}
          defaultValues={{
            email: "",
            password: "",
          }}
          setOpenDialog={setOpenDialog}
        />
      )}
      <SignSort
        onClick={() =>
          setModeSign((s) => ({
            mode: s.mode === "signUp" ? "signIn" : "signUp",
          }))
        }
      >
        {modeSign.mode === "signUp"
          ? "Do you have an account?"
          : "Create account"}
      </SignSort>
      <ConnectWithGoogle>OR</ConnectWithGoogle>
      <GoogleLogin
        shape="circle"
        size="large"
        width="300px"
        context="signup"
        text="continue_with"
        onSuccess={(credentialResponse) => console.log({ credentialResponse })}
        onError={() => console.log("Login faild")}
      />
    </SignUpDialog>
  );
};

export default IndexForm;

const SignUpDialog = styled.div`
  /* margin: 0 auto; */
  text-align: center;
  color: blue;
  overflow: hidden scroll;
  max-height: 20rem;
  max-width: 45rem;
  background: white;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  > * {
    margin: 1rem 0;
  }
`;

const SignSort = styled.div`
  padding: 1rem 0;
`;

const ConnectWithGoogle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: gray;
  font-size: 1.1em;
  padding: 0 0 1rem;
  ::before,
  ::after {
    flex: 1;
    background: gray;
    height: 0.1rem;
    content: "";
  }
`;
