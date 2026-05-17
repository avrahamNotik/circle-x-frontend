import { useState, type HTMLInputTypeAttribute } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props<T extends FieldValues> {
  label: string;
  name: Extract<keyof T, string>;
  type?: HTMLInputTypeAttribute;
  requierd?: boolean;
}
const GenericFormInput = <T extends FieldValues>({
  type = "text",
  name,
  label,
  requierd = false,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name];

  if (type === "date")
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name as unknown as Path<T>}
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              sx={{ width: "48%", borderRadius: "0.5rem" }}
              label={label}
              slotProps={{
                textField: {
                  color: "info",
                  error: !!error,
                  helperText: error?.message as string,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  return (
    <TextField
      required={requierd}
      color="info"
      sx={{ width: "48%", borderRadius: "0.5rem" }}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      {...register(name as unknown as Path<T>)}
      label={label}
      error={!!error}
      helperText={error?.message as string}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {type === "password" && (
                <IconButton
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default GenericFormInput;
