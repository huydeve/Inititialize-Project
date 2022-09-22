import { TextField } from '@mui/material';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      variant="outlined"
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
