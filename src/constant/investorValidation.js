/* eslint-disable react/prop-types */
import { TableCell, Chip } from '@mui/material';
import * as yup from 'yup';

// Add form values
const formAllValues = {
  investor_name: '',
  pan_no: '',
  mobile_no: '',
  investor_type: ''
};
const validationSchema = yup.object({
  investor_name: yup.string().required('Investor Name is required'),
  pan_no: yup.string().required('Pan number is required'),
  mobile_no: yup.number().required('Mobile number is required'),
  investor_type: yup.string().required('Investor type is required')
});
// Search Item form fields
const filterFormValues = {
  search: ''
};
const formValueFields = [
  {
    fieldName: 'search',
    label: 'Global Search',
    type: 'text'
  }
];
const filterValueFields = [
  {
    fieldName: 'search',
    label: 'Global Search',
    type: 'text'
  }
];
const filterValidationSchema = yup.object({
  search: yup.string()
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
