import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import GenericFormProvider from "./GenericFormProvider";
import {
  signInField,
  signInSchema,
  signUpField,
  signUpSchema,
  type SignUpFormValues,
} from "./formSetting";
import { useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { genericAxios } from "../api/genericRestApi";
import type { FieldValues } from "react-hook-form";
import { useGenericMutation } from "../query/useGenericMutation";
import { toast } from "react-toastify";

const AUTH = "auth";

interface Props {
  setOpenDialog: () => void;
}
const IndexForm = ({ setOpenDialog }: Props) => {
  const [modeSign, setModeSign] = useState<Record<"mode", "signUp" | "signIn">>(
    { mode: "signUp" },
  );

  const mutation = useGenericMutation({
    mutationFn: ({ url, data }: { url: string; data: object }) =>
      genericAxios({ url, axiosMethod: "POST", data }),
    mutationKey: ["me"],
  });
  function onSubmitSignUp(data: SignUpFormValues) {
    const url = "players/createPlayer";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { birthDay, confirmPassword, ...rest } = data;
    const filterData = { ...rest, ...(birthDay && birthDay) };
    mutation
      .mutateAsync({
        url,
        data: filterData,
      })
      .then(() => toast.success("Sign up is succussfuly"))
      .catch((err) => {
        console.log({ err });
        toast.error("Sign up is faild");
      });
  }

  function onSubmitSignIn<T extends FieldValues>(data: T) {
    const url = "auth/login";
    mutation
      .mutateAsync({
        url,
        data,
      })
      .then(() => toast.success("Login is succussfuly"))
      .catch((err) => {
        console.log({ err });
        toast.error("Login is faild");
      });
  }

  const googleLogin = async (credentialResponse: CredentialResponse) => {
    const data = { googleToken: credentialResponse.credential };

    await genericAxios({
      axiosMethod: "POST",
      url: `${AUTH}/googleLogin`,
      data,
    })
      .then((d) => console.log({ d }))
      .catch((e) => console.log({ e }))
      .finally(() => setOpenDialog());
  };

  return (
    <SignUpDialog>
      <Typography variant="h5">
        {modeSign.mode === "signUp" ? "Sign up" : "Sign in"}
      </Typography>
      {modeSign.mode === "signUp" ? (
        <GenericFormProvider
          fields={signUpField}
          onSubmit={onSubmitSignUp}
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
          onSubmit={onSubmitSignIn}
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
        onSuccess={googleLogin}
        onError={() => console.log("Login faild")}
        useOneTap
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
