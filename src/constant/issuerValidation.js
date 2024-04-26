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
const validationSchema = yup.object({
  issuer_gst_number: yup.string().required('Issuer GST Number is required'),
  issuer_name: yup.string().required('Issuer Name is required'),
  issuer_pan: yup
    .string()
    .matches(/^([A-Z]){3}([P]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN format')
    .length(10, 'PAN must be exactly 10 characters')
    .required('Issuer PAN is required'),
  issuer_tollfree_number: yup.string().required('Tollfree Number is required'),
  logo_url: yup.string().required('Logo URL is required')
});
// Search Item form fields
const filterFormValues = {
  issuer_name: ''
};
const formValueFields = [
  {
    fieldName: 'issuer_name',
    label: 'Issuer Name',
    type: 'text'
  }
];
const filterValidationSchema = yup.object({
  issuer_name: yup.string()
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
      return <Chip color="error" label="Not Active" size="medium" variant="light" />;
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
