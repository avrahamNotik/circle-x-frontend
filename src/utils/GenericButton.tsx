import { Button, type ButtonProps } from "@mui/material";
import type { HTMLInputTypeAttribute } from "react";

interface Props {
  contant: string;
  onClick?: () => void;
  type?: HTMLInputTypeAttribute;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  loading?: ButtonProps["loading"];
  endIcon?: ButtonProps["endIcon"];
  startIcon?: ButtonProps["startIcon"];
}
const GenericButton = ({
  contant,
  onClick,
  type,
  color,
  variant = "outlined",
  loading,
  endIcon,
  startIcon,
}: Props) => {
  return (
    <Button
      loading={loading}
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {contant}
    </Button>
  );
};

export default GenericButton;
