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

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues(value);
  };
  const formAllValues = {
    methodName: '',
    productType: ''
  };
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const [data, setData] = useState([]);
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'Method Name',
        accessor: 'method_name'
      },
      {
        Header: 'Product Type',
        accessor: 'productType'
      }
    ],
    []
  );

  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  const validationSchema = yup.object({
    method_name: yup.string().required('Name is required'),
    product_type_name: yup.string().required('Email is required')
  });

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/product/getproductmethod');
      console.log(response);
    }

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
              const response = await axios.post('/product/createproduct-type', values);
              console.log(response);
              //   setData((prevData) => {
              //     return [...prevData, values];
              //   });
            } else {
              setIsEditing(!isEditing);
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
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="product_type_name">Product Type</InputLabel>
                        <TextField
                          // fullWidth
                          // id="email"
                          name="product_type_name"
                          placeholder="Enter your Product Type"
                          type="text"
                          value={values.product_type_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.product_type_name && Boolean(errors.product_type_name)}
                          helperText={touched.product_type_name && errors.product_type_name}
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
