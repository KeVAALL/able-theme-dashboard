/* eslint-disable react/prop-types */
import { TableCell, Chip } from '@mui/material';
import * as yup from 'yup';

// Add form Values
const formAllValues = {
  issuer_gst_number: '',
  issuer_name: '',
  issuer_pan: '',
  issuer_tollfree_number: '',
  logo_url: ''
};
const digitsOnly = (value) => /^\d+$/.test(value);
const validationSchema = yup.object({
  issuer_gst_number: yup
    .string()
    .matches(/^\s*\S[\s\S]*$/, 'Remove Spaces')
    .matches(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/, 'Invalid GST')
    .max(15, 'PAN must be exactly 15 characters')
    .required('Issuer GST Number is required'),
  issuer_name: yup
    .string()
    .matches(/^\s*\S[\s\S]*$/, 'Remove Spaces')
    .required('Issuer Name is required'),
  issuer_pan: yup
    .string()
    .matches(/^\s*\S[\s\S]*$/, 'Remove Spaces')
    .matches(/^([A-Z]){3}([P]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN format')
    .max(10, 'PAN must be exactly 10 characters')
    .required('Issuer PAN is required'),
  issuer_tollfree_number: yup.string().required('Tollfree Number is required'),
  logo_url: yup
    .string()
    .matches(/^\s*\S[\s\S]*$/, 'Remove Spaces')
    .required('Logo URL is required')
});
// Search Item form fields
const filterFormValues = {
  issuer_name: ''
};
const formValueFields = [
  {
    fieldName: 'issuer_name',
    label: 'Issuer Name',
    placeholder: 'Please enter Issuer name',
    type: 'text'
  }
];
const filterValidationSchema = yup.object({
  issuer_name: yup
    .string()
    .trim()
    .required('First Name is required')
    .matches(/\S+/, 'First Name cannot be empty or contain only whitespace')
});
// Table Columns
const VisibleColumn = [];
const ImageCell = ({ value }) => {
  return (
    <TableCell style={{ paddingLeft: '0px' }}>
      <img src={value} alt="Custom" style={{ width: '90%', height: 60 }} />
    </TableCell>
  );
};
const StatusCell = ({ value }) => {
  switch (value) {
    case 0:
      return <Chip color="error" label="InActive" size="medium" variant="light" />;
    case 1:
      return <Chip color="success" label="Active" size="medium" variant="light" />;
    default:
      return <Chip color="info" label="None" size="medium" variant="light" />;
  }
};
const tableColumns = [
  {
    Header: 'Logo URL',
    accessor: 'logo_url',
    customCell: ImageCell
  },
  {
    Header: 'Issuer Name',
    accessor: 'issuer_name'
  },
  {
    Header: 'Tollfree Number',
    accessor: 'issuer_tollfree_number'
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
  ImageCell,
  StatusCell,
  tableColumns,
  VisibleColumn
};
