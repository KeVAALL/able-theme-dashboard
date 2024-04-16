import { useEffect, useMemo, useState } from 'react';
// material-ui

import { Divider, Box, Card, Button, Grid, InputLabel, Stack, TextField, CardHeader, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit } from 'iconsax-react';

// project-imports
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { SubmitButton } from 'utils/button';
import MultiTable from 'pages/tables/react-table/multi-table';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/Loader';
import axios from 'utils/axios';

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
        Header: 'ID',
        accessor: 'product_type_id'
      },
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
    product_type: yup.string().required('Email is required')
  });

  async function getData() {
    const response = await axios.post('/product/getproductmethod', {
      method_name: 'getall'
    });
    console.log(response.data.data);
    setData(response.data.data);
  }
  useEffect(() => {
    getData();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              const response = await axios.post('/product/createproduct-type', { ...values, method_name: 'add' });
              console.log(response);
              clearFormValues();
              getData();
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              const response = await axios.post('/product/createproduct-type', { ...values, method_name: 'update' });
              clearFormValues();
              setIsEditing(!isEditing);
              getData();
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
                  borderColor: theme.palette.divider
                }}
              >
                <SubmitButton changeTableVisibility={changeTableVisibility} clearFormValues={clearFormValues} />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="method_name">Method Name</InputLabel>
                        <TextField
                          // fullWidth
                          // id="userName"
                          name="method_name"
                          placeholder="Enter Method Name"
                          type="text"
                          value={values.method_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.method_name && Boolean(errors.method_name)}
                          helperText={touched.method_name && errors.method_name}
                        />
                      </Stack>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="product_type">Product Type</InputLabel>
                        <TextField
                          // fullWidth
                          // id="email"
                          name="product_type"
                          placeholder="Enter your Product Type"
                          type="text"
                          value={values.product_type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.product_type && Boolean(errors.product_type)}
                          helperText={touched.product_type && errors.product_type}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {!showTable && (
        <MainCard title="Products" changeTableVisibility={changeTableVisibility} showButton border sx={{ height: '100%', boxShadow: 1 }}>
          <MultiTable
            columns={columns}
            data={data}
            formValues={formValues}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            setSearchData={setSearchData}
            getData={getData}
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
