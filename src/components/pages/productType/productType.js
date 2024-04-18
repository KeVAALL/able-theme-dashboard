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
import axios from 'utils/axios';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import { enqueueSnackbar } from 'notistack';
import CustomTextField from 'utils/textfield';

// assets
import { dispatch } from '../../../redux';
import { openSnackbar } from 'redux/reducers/snackbar';

function ProductType() {
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues({ product_type_id: value.product_type_id, product_type: value.product_type });
    // setEditing(value);
  };
  const setSearchData = (product) => {
    setData([product]);
  };

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
  const formAllValues = {
    product_type: ''
  };
  const validationSchema = yup.object({
    product_type: yup.string().required('Product Type is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'Product Type',
        accessor: 'product_type'
      }
    ],
    []
  );

  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  async function getData() {
    try {
      const response = await axios.post('/product/getproduct_type', {
        method_name: 'getall'
      });
      return response.data.data;
    } catch (err) {
      return err;
    }
  }
  const {
    isPending,
    error,
    refetch: productTypeTableDataRefetch
  } = useQuery({
    queryKey: ['productTypeTableData'],
    queryFn: getData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onSuccess: (data) => {
      if (!data) {
        setData([]);
      }
      console.log('Fetched' + data);
      setData(data);
    }
  });
  async function getOneProductType(values) {
    try {
      const response = await axios.post('/product/getproduct_type', {
        method_name: 'getone',
        ...values
      });
      setSearchData(response.data.data);
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          message: error.message,
          variant: 'alert',
          alert: {
            color: 'error'
          }
        })
      );
    }
  }
  async function deleteOneProductType(values) {
    console.log(values.product_type_id);
    await axios.post('/product/saveproduct_type', {
      product_type_id: values.product_type_id,
      method_name: 'delete'
    });
    enqueueSnackbar('Product Type Deleted', {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }
  //   useEffect(() => {
  //     getData();

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }, []);

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              const response = await axios.post('/product/saveproduct_type', { ...values, method_name: 'add' });
              console.log(response);
              clearFormValues();
              enqueueSnackbar('Product type added', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              productTypeTableDataRefetch();
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              await axios.post('/product/saveproduct_type', { ...values, method_name: 'update' });
              clearFormValues();
              setIsEditing(!isEditing);
              enqueueSnackbar('Product Type Updated', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              productTypeTableDataRefetch();
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
            getOneItem={getOneProductType}
            deleteOneItem={deleteOneProductType}
            setSearchData={setSearchData}
            tableDataRefetch={productTypeTableDataRefetch}
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
  /* <Grid item xs={4}>
                      <CustomAutoComplete options={autocompleteData} optionName="product_type" label="Label" />
                    </Grid> */
}
