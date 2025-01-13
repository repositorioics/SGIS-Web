import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

const CustomDatePicker = ({ label, value, onChange, error, helperText, name }) => {
  return (
    <InputMask
      mask="99/99/9999" // Máscara para el formato DD/MM/YYYY
      value={value}
      onChange={onChange}
      maskPlaceholder="dd/mm/yyyy"
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          label={label}
          name={name}
          fullWidth
          margin="normal"
          error={Boolean(error)}
          helperText={helperText}
        />
      )}
    </InputMask>
  );
};

export default CustomDatePicker;