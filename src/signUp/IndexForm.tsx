import styled from "@emotion/styled";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericFormInput from "./GenericFormInput";
import { Typography } from "@mui/material";
import GenericButton from "../utils/GenericButton";
import { useState, type HTMLInputTypeAttribute } from "react";
import type { ZodSchema } from "zod";

interface formField<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  requierd: boolean;
}

interface Props<T extends FieldValues> {
  setOpenDialog: () => void;
  title: string;
  fields: formField<T>[];
  onSubmit: SubmitHandler<T>;
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
}
const IndexForm = <T extends FieldValues>({
  setOpenDialog,
  title,
  fields,
  onSubmit,
  schema,
  defaultValues,
}: Props<T>) => {
  const [loading, setloading] = useState<boolean>(false);
  const methods = useForm<T>({
    resolver: zodResolver(schema as unknown as never),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmitForm: SubmitHandler<T> = async (data) => {
    setloading(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log({ data });
        resolve(null);
      }, 3000),
    );
    await onSubmit(data);
    setloading(false);
    setOpenDialog();
  };
  return (
    <SignUpDialog>
      <Typography variant="h5">{title}</Typography>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          {fields.map((field, index) => (
            <GenericFormInput
              label={field.label}
              name={field.name}
              type={field.type}
              requierd={field.requierd}
              key={index}
            />
          ))}
          <ButtonsDiv>
            <GenericButton
              startIcon={<SendIcon />}
              contant="sign in"
              variant="outlined"
              onClick={() => {}}
              type="submit"
              loading={loading}
            />
            <GenericButton
              startIcon={<CancelScheduleSendIcon />}
              color="error"
              contant="cancel"
              variant="outlined"
              onClick={setOpenDialog}
              type="button"
              loading={loading}
            />
          </ButtonsDiv>
        </Form>
      </FormProvider>
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
  border: 2px solid gray;
  padding: 1rem;
  border-radius: 0.5rem;
  > * {
    margin: 1rem 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 1rem;
`;
const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;
