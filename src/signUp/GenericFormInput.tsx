import { useState, type HTMLInputTypeAttribute } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
interface Props<T extends FieldValues> {
  labal: string;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
}
const GenericFormInput = <T extends FieldValues>({
  type = "text",
  name,
  labal,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log({ type });

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name];
  return (
    <TextField
      color="info"
      sx={{ width: "100%", borderRadius: "0.5rem" }}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      {...register(name)}
      label={labal}
      error={!!error}
      helperText={!error ? "" : `${error?.message}`}
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

{
  /* <input type={type} {...register} placeholder="email" />
{errors && <p>{error?.message as string}</p>} */
}
