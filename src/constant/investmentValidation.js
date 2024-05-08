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
      return <Chip color="error" label="Inactive" size="medium" variant="outlined" />;
    case 1:
      return <Chip color="info" label="Pending" size="medium" variant="outlined" />;
    default:
      return <Chip color="info" label="None" size="medium" variant="light" />;
  }
};
const tableColumns = [
  {
    Header: 'Date',
    accessor: 'created_on',
    width: 100
  },
  {
    Header: 'Investor Name',
    accessor: 'investor_name'
  },
  {
    Header: 'Investor Code',
    accessor: 'investor_code'
  },
  {
    Header: 'IFA Code',
    accessor: 'ifa_code'
  },
  {
    Header: 'Amount',
    accessor: 'investment_amount'
  },
  {
    Header: 'Duration',
    accessor: 'tenure_selected'
  },
  {
    Header: 'Payout Method',
    accessor: 'fd_payout_method'
  },
  {
    Header: 'Interest Rate',
    accessor: 'rate_of_interest'
  },
  {
    Header: 'Status',
    accessor: 'status',
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
