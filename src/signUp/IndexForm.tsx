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
        {modeSign.mode === "signUp" ? "Sign up" : "Sign in"}
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
      <div
        onClick={() =>
          setModeSign((s) => ({
            mode: s.mode === "signUp" ? "signIn" : "signUp",
          }))
        }
      >
        Do you have an account?
      </div>
    </SignUpDialog>
  );
};

export default IndexForm;

const SignUpDialog = styled.div`
  text-align: center;
  color: blue;
  height: 20rem;
  min-width: 35rem;
  background: white;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  > * {
    margin: 1rem 0;
  }
`;
