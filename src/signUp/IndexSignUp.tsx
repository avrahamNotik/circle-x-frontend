import styled from "@emotion/styled";
import { FormProvider, useForm } from "react-hook-form";
import { signUpSchema, type SignUpFormType } from "./formSetting";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericFormInput from "./GenericFormInput";
import { Typography } from "@mui/material";

const IndexSignUp = () => {
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });
  const { handleSubmit } = methods;
  function onSubmitSignUpForm(data: SignUpFormType) {
    console.log({ data });
  }
  return (
    <SignUpDialog>
      <Typography variant="h5">Sign in</Typography>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmitSignUpForm)}>
          <GenericFormInput<SignUpFormType>
            labal="first name"
            name="firstName"
            type="text"
          />
          <GenericFormInput<SignUpFormType>
            labal="last name"
            name="lastName"
            type="text"
          />
          <GenericFormInput<SignUpFormType>
            labal="email"
            name="email"
            type="email"
          />
          <GenericFormInput<SignUpFormType>
            labal="birth day"
            name="birthDay"
            type="email"
          />
          <GenericFormInput<SignUpFormType>
            labal="password"
            name="password"
            type="password"
          />
          <GenericFormInput<SignUpFormType>
            labal="confirm password"
            name="confirmPassword"
            type="password"
          />
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
  border: 2px solide gray;
  padding: 1rem;
  border-radius: 0%.5rem;
  > * {
    margin: 1rem 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
