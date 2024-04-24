import * as yup from 'yup';

// Add form values
const formAllValues = {
  product_type: ''
};
const validationSchema = yup.object({
  product_type: yup.string().required('Product Type is required')
});
// Search Item form fields
const filterFormValues = {
  product_type: ''
};
const formValueFields = [
  {
    fieldName: 'product_type',
    label: 'Product Type',
    type: 'text'
  }
];
const filterValidationSchema = yup.object({
  product_type: yup.string().required('Product Type is required')
});
// Table Columns
const tableColumns = [
  {
    Header: 'Product Type',
    accessor: 'product_type'
  }
];

export { formAllValues, validationSchema, filterFormValues, formValueFields, filterValidationSchema, tableColumns };
