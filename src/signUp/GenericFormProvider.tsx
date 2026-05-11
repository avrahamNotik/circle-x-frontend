import styled from "@emotion/styled";
import { useState, type HTMLInputTypeAttribute } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import type { ZodSchema } from "zod";
import GenericFormInput from "./GenericFormInput";
import GenericButton from "../utils/GenericButton";
import { zodResolver } from "@hookform/resolvers/zod";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";

interface formField<T extends FieldValues> {
  label: string;
  name: Extract<keyof T, string>;
  type: HTMLInputTypeAttribute;
  requierd: boolean;
}

interface Props<T extends FieldValues> {
  setOpenDialog: () => void;
  fields: formField<T>[];
  onSubmit: SubmitHandler<T>;
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
}

const GenericFormProvider = <T extends FieldValues>({
  setOpenDialog,
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
        resolve(null);
      }, 3000),
    );
    await onSubmit(data);
    setloading(false);
    setOpenDialog();
  };
  return (
    <div>
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
    </div>
  );
};

export default GenericFormProvider;

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
