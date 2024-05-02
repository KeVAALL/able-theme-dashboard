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
  // product_type: yup.string().required('Product Type is required')
  product_type: yup
    .string()
    .trim()
    .required('Product Type is required')
    .matches(/\S+/, 'Product Type cannot be empty or contain only whitespace')
});
// Table Columns
const VisibleColumn = [];
const tableColumns = [
  {
    Header: 'Product Type',
    accessor: 'product_type'
  }
];

export { formAllValues, validationSchema, filterFormValues, formValueFields, filterValidationSchema, tableColumns, VisibleColumn };
