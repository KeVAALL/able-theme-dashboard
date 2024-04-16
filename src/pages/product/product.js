import { useEffect, useMemo, useState } from 'react';
// material-ui

import { Divider, Box, Card, Grid, InputLabel, Stack, TextField, CardContent, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';

// project-imports
import MainCard from 'components/MainCard';
import MultiTable from 'pages/tables/react-table/multi-table';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { SubmitButton } from 'utils/button';
import { enqueueSnackbar } from 'notistack';
import CustomTextField, { CustomAutoComplete } from 'utils/textfield';

function Product() {
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues(value);
  };
  const setSearchData = (product) => {
    setData([product]);
  };
  const formAllValues = {
    product_type: ''
  };
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
  const validationSchema = yup.object({
    product_type: yup.string().required('Product Type is required')
  });
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];

  async function getData() {
    try {
      const response = await axios.post('/product/getproductmethod', {
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
    data: tableData,
    refetch: tableDataRefetch
  } = useQuery({
    queryKey: ['productTableData'],
    queryFn: getData,
    onSuccess: (data) => {
      setData(data);
    }
  });
  //   useEffect(() => {
  //     getData();

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }, []);

  //   if (loading) return <Loader />;
  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              const response = await axios.post('/product/createproduct-type', { ...values, method_name: 'add' });
              clearFormValues();
              enqueueSnackbar('Product type added', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              tableDataRefetch();
              //   getData();
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              await axios.post('/product/createproduct-type', { ...values, method_name: 'update' });
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
              tableDataRefetch();

              //   getData();
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
                      {/* <Stack spacing={1}> */}
                      {/* <InputLabel htmlFor="product_type">Product Type</InputLabel> */}
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

                      {/* </Stack> */}
                    </Grid>
                    {/* <Grid item xs={4}>
                      <CustomAutoComplete options={autocompleteData} optionName="product_type" label="Label" />
                    </Grid> */}
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
            formValues={formValues}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            setSearchData={setSearchData}
            tableDataRefetch={tableDataRefetch}
            // getData={getData}
          />
        </MainCard>
      )}
    </>
  );
}

export default Product;

//   {
//     Header: 'Actions',
//     accessor: 'actions',
//     Cell: ({ row: { original } }) => {
//       <Edit
//         style={{
//           lineHeight: 1.66,
//           fontWeight: 400,
//           display: 'table-cell',
//           verticalAlign: 'inherit',
//           textAlign: 'left',
//           color: '#1D2630',
//           fontSize: '0.875rem',
//           borderColor: 'rgba(219, 224, 229, 0.65)'
//         }}
//         onClick={() => {
//           // handleEdit(row.original);
//           changeTableVisibility();
//           console.log(original);
//         }}
//       />;
//     }
//   }
// {
/* <Autocomplete
                        fullWidth
                        disablePortal
                        
                        className="common-autocomplete"
                        //   style={{paddingBlock:"6px"}}
                        id="basic-autocomplete-label"
                        options={autocompleteData}
                        getOptionLabel={(option) => option.product_type} // Assuming 'product_type' is the label you want to display
                        renderInput={(params) => <TextField {...params} label="Label" />}
                                          /> */
// }
