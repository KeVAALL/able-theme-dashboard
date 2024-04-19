import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell } from '@mui/material';
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
import CustomTextField, { CustomCheckbox } from 'utils/textfield';

// assets
import { GetProductData, GetOneProduct, SaveProduct, EditProduct, DeleteOneProduct } from 'hooks/fixedDeposit/fixedDeposit';

function FixDeposit() {
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState([]);
  const [checkedCumulative, setCheckedCumulative] = useState(false); // Initial state
  const [checkedNonCumulative, setCheckedNonCumulative] = useState(false); // Initial state

  // Toggle checked state between 0 and 1 when clicked
  const handleCumulativeChange = () => {
    setCheckedCumulative((prevChecked) => (!prevChecked ? 1 : 0)); // Toggle between 0 and 1
  };
  const handleNonCumulativeChange = () => {
    setCheckedNonCumulative((prevChecked) => (!prevChecked ? 1 : 0)); // Toggle between 0 and 1
  };
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues(value);
    setCheckedCumulative(Boolean(value.is_cumulative));
    setCheckedNonCumulative(Boolean(value.is_non_cumulative));
  };
  const setSearchData = (fixedDeposit) => {
    setProductData(fixedDeposit);
  };

  const filterFormValues = {
    fd_name: ''
  };
  const formValueFields = [
    {
      fieldName: 'fd_name',
      label: 'FD Name',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required')
  });

  // Add Form Values
  const formAllValues = {
    fd_name: '',
    min_tenure: '',
    max_tenure: '',
    logo_url: ''
  };
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    min_tenure: yup.string().required('Minimum Tenure is required'),
    max_tenure: yup.string().required('Max Tenure is required'),
    logo_url: yup.string().required('Logo URL is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
    setCheckedCumulative(false);
    setCheckedNonCumulative(false);
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const theme = useTheme();

  const ImageCell = ({ value }) => {
    return (
      <TableCell style={{ paddingLeft: '0px' }}>
        <img src={value} alt="Custom" style={{ width: '90%', height: 60 }} />
      </TableCell>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Logo URL',
        accessor: 'logo_url',
        customCell: ImageCell
      },
      {
        Header: 'FD Name',
        accessor: 'fd_name'
      },
      {
        Header: 'Issuer Name',
        accessor: 'issuer_name'
      },
      {
        Header: 'Min Tenure',
        accessor: 'min_tenure'
      },
      {
        Header: 'Max Tenure',
        accessor: 'max_tenure'
      }
      //   {
      //     Header: 'Is Cumulative',
      //     accessor: 'is_cumulative'
      //   },
      //   { Header: 'Is Non-Cumulative', accessor: 'is_non_cumulative' }
    ],
    []
  );

  const {
    isPending,
    error,
    refetch: ProductTableDataRefetch
  } = useQuery({
    queryKey: ['productTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetProductData,
    onSuccess: (data) => {
      setProductData(data);
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
              SaveProduct(values, ProductTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative);
              //   const response = await axios.post('/product/saveproduct', {
              //     ...values,
              //     is_cumulative: checkedCumulative,
              //     is_non_cumulative: checkedNonCumulative,
              //     method_name: 'add'
              //   });
              //   clearFormValues();
              //   enqueueSnackbar('Product added', {
              //     variant: 'success',
              //     autoHideDuration: 2000,
              //     anchorOrigin: {
              //       vertical: 'top',
              //       horizontal: 'right'
              //     }
              //   });
              //   ProductTableDataRefetch();
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              await axios.post('/product/saveproduct', { ...values, method_name: 'update' });
              clearFormValues();
              setIsEditing(!isEditing);
              enqueueSnackbar('Product Updated', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              ProductTableDataRefetch();
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
                <SubmitButton title="FD Entry" changeTableVisibility={changeTableVisibility} clearFormValues={clearFormValues} />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="FD Name"
                        name="fd_name"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Minimum Tenure"
                        name="min_tenure"
                        values={values}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Max Tenure"
                        name="max_tenure"
                        values={values}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <CustomCheckbox
                        checked={checkedCumulative}
                        handleChange={handleCumulativeChange}
                        name="checkedCumulative"
                        label="Cumulative"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <CustomCheckbox
                        checked={checkedNonCumulative}
                        handleChange={handleNonCumulativeChange}
                        name="checkedNonCumulative"
                        label="Non Cumulative"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Logo URL"
                        name="logo_url"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
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
        <MainCard title="Product" changeTableVisibility={changeTableVisibility} showButton border sx={{ height: '100%', boxShadow: 1 }}>
          <MultiTable
            columns={columns}
            data={productData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            // getOneItem={getOneProduct}
            getOneItem={GetOneProduct}
            deleteOneItem={DeleteOneProduct}
            setSearchData={setSearchData}
            tableDataRefetch={ProductTableDataRefetch}
          />
        </MainCard>
      )}
    </>
  );
}

export default FixDeposit;
