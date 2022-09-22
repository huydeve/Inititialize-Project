import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Control, useController } from 'react-hook-form';
export interface SelectOption {
  label: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  options?: SelectOption[];
  disabled?: boolean;
}

export function SelectField(props: SelectFieldProps) {
  const { name, control, label, options, disabled, ...inputProps } = props;
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      margin="normal"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        id={`${name}_id`}
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
