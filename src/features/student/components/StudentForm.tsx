import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/lab/Alert';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import {
  InputField,
  RadioGroupField,
  SelectField,
} from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';

type Props = {
  initialValues?: Student;
  onSubmit?: (value: Student) => void;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter an integer.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .positive('Please enter an integer.')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),

    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required(),
    city: yup.string().required('Please select city.'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: Props) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<String>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    console.log('Submit:', formValues);
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });

    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Failed to add/update student', error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField
          name="city"
          label="City"
          control={control}
          options={cityOptions}
        />

        {error && (
          <Alert severity="error">This is an error alert - check it out</Alert>
        )}
        <Box mt={3}>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
