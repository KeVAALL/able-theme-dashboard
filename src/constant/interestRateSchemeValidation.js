import { TableCell } from '@mui/material';
import * as yup from 'yup';

// Add form values
const formAllSchemeValues = {
  min_days: '',
  max_days: '',
  rate_of_interest_regular: '',
  rate_of_interest_senior_citezen: '',
  rate_of_interest_female: '',
  rate_of_interest_female_senior_citezen: ''
};
const validationSchema = yup.object({
  min_days: yup.number().required('Min Tenure is required').min(1, 'Number must be greater than or equal to 1'),
  max_days: yup.number().required('Max Tenure is required').min(1, 'Number must be greater than or equal to 1'),
  rate_of_interest_regular: yup.number().required('Rate is required').min(1, 'Number must be greater than or equal to 1'),
  rate_of_interest_senior_citezen: yup.number().required('Rate is required').min(1, 'Number must be greater than or equal to 1'),
  rate_of_interest_female: yup.number().required('Rate is required').min(1, 'Number must be greater than or equal to 1'),
  rate_of_interest_female_senior_citezen: yup.number().required('Rate is required').min(1, 'Number must be greater than or equal to 1')
});

export { formAllSchemeValues, validationSchema };
