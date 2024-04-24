import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField from 'utils/textfield';

// assets
import {
  formAllValues,
  validationSchema,
  filterFormValues,
  formValueFields,
  filterValidationSchema,
  tableColumns
} from 'constant/productTypeValidation';
import {
  GetProductTypeData,
  GetOneProductType,
  SaveProductType,
  EditProductType,
  DeleteOneProductType
} from 'hooks/productType/productType';

function ProductType() {
  // Main data
  const [data, setData] = useState([]);
  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

  // State Setting
  const setEditing = (value) => {
    setFormValues({ product_type_id: value.product_type_id, product_type: value.product_type });
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };

  // Search one item state
  const setSearchData = (product) => {
    setData(product);
  };
  // Form State
  const [formValues, setFormValues] = useState(formAllValues);
  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Table Columns
  const columns = useMemo(() => tableColumns, []);

  // Fetching Data using React Query
  const {
    isPending,
    error,
    refetch: productTypeTableDataRefetch
  } = useQuery({
    queryKey: ['productTypeTableData'],
    queryFn: GetProductTypeData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onSuccess: (data) => {
      if (!data) {
        setData([]);
      }
      setData(data);
    }
  });

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              console.log(isEditing);
              SaveProductType(values, productTypeTableDataRefetch, clearFormValues);
            }
            if (isEditing === true) {
              console.log(isEditing);
              EditProductType(values, productTypeTableDataRefetch, clearFormValues, setIsEditing);
            }
            changeTableVisibility();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting }) => (
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              sx={{ width: '100%' }}
            >
              <Card
                sx={{
                  position: 'relative',
                  border: '1px solid',
                  borderRadius: 1.5,
                  borderColor: theme.palette.divider,
                  overflow: 'visible'
                }}
              >
                <SubmitButton title="Product Type Entry" changeTableVisibility={changeTableVisibility} clearFormValues={clearFormValues} />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Product Type"
                        name="product_type"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        FormHelperTextProps={{
                          style: {
                            marginLeft: 0
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {!showTable && (
        <MainCard
          title="Product Type Search"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <MultiTable
            columns={columns}
            data={data}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneProductType}
            deleteOneItem={DeleteOneProductType}
            setSearchData={setSearchData}
            tableDataRefetch={productTypeTableDataRefetch}
            setActiveEditing={setActiveEditing}
          />
        </MainCard>
      )}
    </>
  );
}

export default ProductType;

// import { CustomAutoComplete } from 'utils/textfield'
// const autocompleteData = [
//   { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
//   { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
// ];
{
  /*  <Grid item xs={4}>
          <CustomAutoComplete options={autocompleteData} optionName="product_type" label="Label" />
      </Grid> 
  */
}
