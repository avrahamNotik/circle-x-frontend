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
import { genericAxios } from "../api/genericRestApi";
import type { FieldValues } from "react-hook-form";
import { useGenericMutation } from "../query/useGenericMutation";

interface Props {
  setOpenDialog: () => void;
}
const IndexForm = ({ setOpenDialog }: Props) => {
  const [modeSign, setModeSign] = useState<Record<"mode", "signUp" | "signIn">>(
    { mode: "signUp" },
  );

  const mutation = useGenericMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      genericAxios(url, "POST", data),
    mutationKey: ["me"],
  });
  function onSubmit<T extends FieldValues>(data: T) {
    const url =
      modeSign.mode === "signUp" ? "players/createPlayer" : "auth/login";
    mutation.mutateAsync({
      url,
      data,
    });
  }
  return (
    <SignUpDialog>
      <Typography variant="h5">
        {modeSign.mode === "signUp" ? "Sign up" : "Sign in"}
      </Typography>
      {modeSign.mode === "signUp" ? (
        <GenericFormProvider
          fields={signUpField}
          onSubmit={onSubmit}
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
          onSubmit={onSubmit}
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
        text={modeSign.mode === "signUp" ? "signup_with" : "continue_with"}
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
  max-height: 30rem;
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
