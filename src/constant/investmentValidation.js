/* eslint-disable react/prop-types */
import { Chip } from '@mui/material';
import { minWidth } from '@mui/system';
import * as yup from 'yup';

// Autocomplete data

// Add form values
const formAllValues = {
  investor_id: 0,
  fd_id: 0,
  ifa_id: 0,
  payout_method_id: 'C',
  investment_amount: 0,
  years: 0,
  months: 0,
  days: 0,
  interest_rate: '0',
  aggrigated_interest: 0,
  maturity_amount: 0
};
const validationSchema = yup.object().shape({
  investor_id: yup.number(),
  fd_id: yup.number(),
  ifa_id: yup.number(),
  payout_method_id: yup.string(),
  investment_amount: yup.number(),
  years: yup.number(),
  months: yup.number(),
  days: yup.number(),
  interest_rate: yup.number(),
  aggrigated_interest: yup.number(),
  maturity_amount: yup.number()
});
// Scheme Form values
const schemeValues = {
  fd_name: '',
  logo_url: '',
  rate_of_interest: '',
  rate_of_interest_1lakh: '',
  tenure: '',
  maturity_id: 1,
  investment_amount: 0
};
const schemeValidation = yup.object().shape({});
// Investor Values

// Search Item form fields
const filterFormValues = {
  search: ''
};
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
    minWidth: 150
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
  schemeValues,
  schemeValidation,
  filterFormValues,
  filterValueFields,
  filterValidationSchema,
  StatusCell,
  tableColumns,
  VisibleColumn
};
