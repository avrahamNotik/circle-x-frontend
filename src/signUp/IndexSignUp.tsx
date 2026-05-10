import styled from "@emotion/styled";
import { FormProvider, useForm } from "react-hook-form";
import { signUpSchema, type SignUpFormType } from "./formSetting";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericFormInput from "./GenericFormInput";
import { Typography } from "@mui/material";
import GenericButton from "../utils/GenericButton";
import { useState } from "react";

const IndexSignUp = () => {
  const [loading, setloading] = useState<boolean>(false);
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });
  const { handleSubmit } = methods;
  function onSubmitSignUpForm(data: SignUpFormType) {
    setloading(true);
    console.log({ data });
    setloading(false);
  }
  return (
    <SignUpDialog>
      <Typography variant="h5">Sign in</Typography>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmitSignUpForm)}>
          <GenericFormInput<SignUpFormType>
            label="first name"
            name="firstName"
            type="text"
            requierd={true}
          />
          <GenericFormInput<SignUpFormType>
            label="last name"
            name="lastName"
            type="text"
            requierd={true}
          />
          <GenericFormInput<SignUpFormType>
            label="email"
            name="email"
            type="email"
            requierd={true}
          />
          <GenericFormInput<SignUpFormType>
            label="birth day"
            name="birthDay"
            type="date"
          />
          <GenericFormInput<SignUpFormType>
            label="password"
            name="password"
            type="password"
            requierd={true}
          />
          <GenericFormInput<SignUpFormType>
            label="confirm password"
            name="confirmPassword"
            type="password"
            requierd={true}
          />
          <ButtonsDiv>
            <GenericButton
              contant="sign in"
              variant="outlined"
              onClick={() => {}}
              type="submit"
              loading={loading}
            />
          </ButtonsDiv>
        </Form>
      </FormProvider>
    </SignUpDialog>
  );
};

export default IndexSignUp;

const SignUpDialog = styled.div`
  text-align: center;
  color: blue;
  min-height: 25rem;
  min-width: 25rem;
  background: white;
  border: 2px solid gray;
  padding: 1rem;
  border-radius: 0.5rem;
  > * {
    margin: 1rem 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
const ButtonsDiv = styled.div`
  display: flex;
  gap: 1rem;
`;
