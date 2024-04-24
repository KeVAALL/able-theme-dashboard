import { TableCell } from '@mui/material';
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
  issuer_pan: yup.string().required('Issuer PAN is required'),
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
  return value === 0 ? 'Not Active' : 'Active';
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
