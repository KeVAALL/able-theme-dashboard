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
        accessor: 'methodName'
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
    methodName: yup.string().required('Name is required'),
    productType: yup.string().required('Email is required')
  });

  useEffect(() => {
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              setData((prevData) => {
                return [...prevData, values];
              });
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
                        <InputLabel htmlFor="userName">Method Name</InputLabel>
                        <TextField
                          // fullWidth
                          // id="userName"
                          name="methodName"
                          placeholder="Enter Method Name"
                          type="text"
                          value={values.methodName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.methodName && Boolean(errors.methodName)}
                          helperText={touched.methodName && errors.methodName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Product Type</InputLabel>
                        <TextField
                          // fullWidth
                          // id="email"
                          name="productType"
                          placeholder="Enter your Product Type"
                          type="text"
                          value={values.productType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.productType && Boolean(errors.productType)}
                          helperText={touched.productType && errors.productType}
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
