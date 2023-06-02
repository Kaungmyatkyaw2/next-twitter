import React, { useState } from "react";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const InputPassword = ({ ...otherProps }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      onChange={otherProps.onChange}
      onBlur={otherProps.onBlur}
      {...otherProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {" "}
            {showPassword ? (
              <Visibility
                className="cursor_pointer"
                onClick={togglePasswordHide}
              />
            ) : (
              <VisibilityOff onClick={togglePasswordHide} />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
