import * as yup from 'yup';

// Add form values
const formAllValues = {
  fd_name: '',
  issuer_name: ''
};
const validationSchema = yup.object({
  fd_name: yup.string().required('FD Name is required'),
  issuer_name: yup.string().required('Issuer Name is required')
});
// Table Columns
const tableColumns = [
  {
    Header: 'Tenure (Days)',
    accessor: 'tenure'
  },
  {
    Header: 'Normal Citizen (%)',
    accessor: 'rate_of_interest_regular'
  },
  {
    Header: 'Senior Citizen (%)',
    accessor: 'rate_of_interest_senior_citezen'
  },
  {
    Header: 'Female Citizen (%)',
    accessor: 'rate_of_interest_female'
  },
  {
    Header: 'Senior Female Citizen (%)',
    accessor: 'rate_of_interest_female_senior_citezen'
  }
];

export { formAllValues, validationSchema, tableColumns };
