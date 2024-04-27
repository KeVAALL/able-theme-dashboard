/* eslint-disable react/prop-types */
import { TableCell, Chip } from '@mui/material';
import * as yup from 'yup';

// Add form values
const formAllValues = {
  investor: { investor_name: '', pan_no: '', mobile_no: '', investor_type: '' },
  // Personal Info
  personal_info: {
    is_indian_resident: '', // Resident Status
    is_married: '', // Marital Status
    birth_date: ''
  },
  // Investor Address
  investor_address: {
    address_line_1: '',
    address_line_2: '',
    pincode: '',
    city: ''
    // is_permanent_address_correspond
  },
  // Personal Details??
  // Nomination
  nominee: {
    full_name: '',
    pan: '',
    date_of_birth: '',
    share_percent: ''
    // relationship: '', ??
  }
};
const validationSchema = yup.object().shape({
  investor: yup.object().shape({
    investor_name: yup.string().required('Investor Name is required'),
    pan_no: yup.string().required('Pan number is required'),
    mobile_no: yup.number().required('Mobile number is required'),
    investor_type: yup.string().required('Investor type is required')
  }),
  personal_info: yup.object().shape({
    is_indian_resident: yup.string(), // Resident Status
    is_married: yup.string(), // Marital Status
    birth_date: yup.date()
  }),
  investor_address: yup.object().shape({
    address_line_1: yup.string().required('Address Line is required'),
    address_line_2: yup.string().required('Address Line 2 is required'),
    pincode: yup.string().required('Pin Code is required'),
    city: yup.string().required('City is required')
    // is_permanent_address_correspond
  }),
  professional_details: yup.object().shape({
    annual_income: yup.number(),
    income_source: yup.string(),
    occupation_name: yup.string()
  }),
  nominee: yup.object().shape({
    full_name: yup.string().required('Name is required'),
    pan: yup.string().required('PAN is required'),
    date_of_birth: yup.date(),
    share_percent: yup.number()
  })
});
// Search Item form fields
// const filterFormValues = {
//   search: ''
// };
const filterFormValues = {
  investor_id: ''
};
const formValueFields = [
  {
    fieldName: 'investor_id',
    label: 'Investor',
    type: 'number'
  }
];
// const filterValueFields = [
//   {
//     fieldName: 'investor_id',
//     label: 'Investor',
//     type: 'number'
//   }
// ];
const filterValidationSchema = yup.object({
  investor_id: yup.number()
});
// Table Columns
const VisibleColumn = [];
const StatusCell = ({ value }) => {
  switch (value) {
    case 0:
      return <Chip color="error" label="Not Active" size="medium" variant="light" />;
    case 1:
      return <Chip color="success" label="Active" size="medium" variant="light" />;
    default:
      return <Chip color="info" label="None" size="medium" variant="light" />;
  }
};
const tableColumns = [
  {
    Header: 'investor Name',
    accessor: 'investor_name'
  },
  {
    Header: 'Pan Number',
    accessor: 'pan_no'
  },
  {
    Header: 'Mobile Number',
    accessor: 'mobile_no'
  },
  {
    Header: 'Type',
    accessor: 'investor_type'
  },
  {
    Header: 'Status',
    accessor: 'is_active',
    customCell: StatusCell
  }
];

export {
  formAllValues,
  validationSchema,
  filterFormValues,
  formValueFields,
  filterValidationSchema,
  StatusCell,
  tableColumns,
  VisibleColumn
};
