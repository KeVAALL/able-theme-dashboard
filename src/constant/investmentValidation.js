/* eslint-disable react/prop-types */
import { Chip } from '@mui/material';
import * as yup from 'yup';

// Autocomplete data

// Add form values
const formAllValues = {};
const validationSchema = yup.object().shape({});
// Search Item form fields
const filterFormValues = {
  search: ''
};
// const filterFormValues = {
//   investor_id: ''
// };
// const formValueFields = [
//   {
//     fieldName: 'investor_id',
//     label: 'Investor',
//     type: 'number'
//   }
// ];
const filterValueFields = [
  // {
  //   fieldName: 'search',
  //   label: 'Search',
  //   type: 'string',
  //   regType: 'string'
  // }
];
const filterValidationSchema = yup.object({
  search: yup.string()
});
// Table Columns
const VisibleColumn = [];
const StatusCell = ({ value }) => {
  switch (value) {
    case 0:
      return <Chip color="error" label="Inactive" size="medium" variant="light" />;
    case 1:
      return <Chip color="success" label="Active" size="medium" variant="light" />;
    default:
      return <Chip color="info" label="None" size="medium" variant="light" />;
  }
};
const tableColumns = [
  {
    Header: 'Date',
    accessor: 'date'
  },
  {
    Header: 'Investor Name',
    accessor: 'name'
  },
  {
    Header: 'Code',
    accessor: 'code'
  },
  {
    Header: 'IFA Code',
    accessor: 'ifa'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Duration',
    accessor: 'duration'
  },
  {
    Header: 'Payout Method',
    accessor: 'payout_method'
  },
  {
    Header: 'Interest Rate',
    accessor: 'interest_rate'
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
  filterValueFields,
  filterValidationSchema,
  StatusCell,
  tableColumns,
  VisibleColumn
};
