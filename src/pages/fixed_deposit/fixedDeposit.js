import { useEffect, useMemo, useState } from 'react';
// material-ui

import {
  Divider,
  Box,
  Card,
  Grid,
  InputLabel,
  Stack,
  TextField,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


// project-imports
import MainCard from 'components/MainCard';
import { SubmitButton } from 'utils/button';
import MultiTable from 'pages/tables/react-table/multi-table';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { FormControl } from '@mui/base';
import { usePost } from 'hooks/usePost';

function FixedDeposit() {
  const { postData } = usePost();
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [issuerData, setIssuerData] = useState([]);

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues(value);
  };
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'product_type_id',
        
      },
      {
        Header: 'Product Type',
        accessor: 'product_type'
      },
      
    ],
    []
  );
  const hanldeFetchIssuer = async () => {
    try {
      const { data } = await postData(
        '/issuer/getissuers',
        {
          method: 'get'
        },
        window.localStorage.getItem('serviceToken')
      );
      //   console.log("issuer data", data?.data);
      console.log('issuer data', data);
      if (data?.status === 200) {
        setIssuerData(data?.data);
      } else {
        alert('something went wrong');
      }
    } catch (error) {
    //   toast.error('somethings went wrong');
    }
  };
  useEffect(() => {
    hanldeFetchIssuer();
  }, []);
  const setSearchData = (product) => {
    setData([product]);
  };
  const formAllValues = {
    FdName: '',
    MinTenure: '',
    MaxTenure: '',
    autocomplete: null,
    IsCumulative: false, // Add this
    IsNonCumulative: false // Add this
  };

  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const theme = useTheme();

  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };
  const validationSchema = yup.object({
    FdName: yup.string().required('FdName is required'),
    // IssuerName: yup.string().required('IssuerName is required'),
    MinTenure: yup.string().required('MinTenure is required'),
    MaxTenure: yup.string().required('MaxTenure is required')
  });

  async function getData() {
    const response = await axios.post('/product/getproductmethod', {
      method_name: 'getall'
    });
    
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
            // console.log(values, setSubmitting, resetForm);
            if (isEditing === false) {
              //   const response = await axios.post('/product/createproduct-type', { ...values, method_name: 'add' });
              console.log({
                ...values,
                autocomplete: values.autocomplete ? values.autocomplete.osb_issuer_id : null,
                IsCumulative: values.IsCumulative ? 1 : 0,
                IsNonCumulative: values.IsNonCumulative ? 1 : 0
              });
              try {
                const { data } = await postData(
                  '/product/createproduct',
                  {
                    fd_max_amount: 0,
                    fd_min_amount: 0,
                    fd_name: "fd name",
                    is_cumulative: values.IsCumulative ? 1 : 0,
                    is_non_cumulative: values.IsNonCumulative ? 1 : 0,
                    issuer_name: values.autocomplete ? values.autocomplete.osb_issuer_id : null,
                    max_tenure: +(values?.MaxTenure),
                    method_name: "string",
                    min_tenure: +(values?.MinTenure),
                    user_id: 3
                  },
                  window.localStorage.getItem('serviceToken')
                );
                //   console.log("issuer data", data?.data);
                console.log('issuer data', data);
                if (data?.status === 200) {
                  setIssuerData(data?.data);
                } else {
                  alert('something went wrong');
                }
              } catch (error) {
                toast.error('somethings went wrong');
              }
            
              
              clearFormValues();
              getData();
            }
            if (isEditing === true) {
              console.log({ ...values, method_name: 'update' });
              const response = await axios.post('/product/createproduct-type', { ...values, method_name: 'update' });
              clearFormValues();
              setIsEditing(!isEditing);
              getData();
            }

            changeTableVisibility();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting ,setFieldValue  }) => (
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
                    <Grid item sm={6} lg={4} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="FdName">FdName</InputLabel>
                        <TextField
                          name="FdName"
                          placeholder="Enter FdName"
                          type="text"
                          value={values.FdName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.FdName && Boolean(errors.FdName)}
                          helperText={touched.FdName && errors.FdName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} lg={4} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="product_type">IssuerName</InputLabel>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          sx={{
                            '& .MuiInputBase-root': {
                              height: '48.13px'
                            }
                          }}
                          value={values.autocomplete}
                          onChange={(event, newValue) => {
                            console.log("good", newValue)
                            // Update the form value with the selected issuer's data
                            setFieldValue('autocomplete', newValue);
                         }}
                          id="basic-autocomplete-label"
                          options={issuerData}
                          getOptionLabel={(option) => (option ? option.issuer_name : '')}
                          renderInput={(params) => <TextField {...params} label="Label" />}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} lg={4} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="product_type">MinTenure</InputLabel>
                        <TextField
                          // fullWidth
                          // id="email"
                          name="MinTenure"
                          placeholder="Enter MinTenure"
                          type="text"
                          value={values.MinTenure}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.MinTenure && Boolean(errors.MinTenure)}
                          helperText={touched.MinTenure && errors.MinTenure}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={6} lg={4} xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="MaxTenure">MaxTenure</InputLabel>
                        <TextField
                          // fullWidth
                          // id="email"
                          name="MaxTenure"
                          placeholder="Enter MaxTenure"
                          type="text"
                          value={values.MaxTenure}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.MaxTenure && Boolean(errors.MaxTenure)}
                          helperText={touched.MaxTenure && errors.MaxTenure}
                        />
                      </Stack>
                    </Grid>
                    <FormControl
                      component="fieldset"
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginLeft:"12px" }}
                    >
                      <FormGroup aria-label="position" row>
                        {/* <FormControlLabel
                          value="IsCumulative"
                          control={
                            <Checkbox
                            checked={values?.IsCumulative}
                            onChange={(event) => setFieldValue('IsCumulative', event.target.checked)}
                            />
                          }
                          // label="Is Cumulative"
                          // labelPlacement="bottom"
                        /> */}
                        <FormControlLabel
      value="IsCumulative"
      control={<Checkbox      checked={values?.IsCumulative}  onChange={(event) => setFieldValue('IsCumulative', event.target.checked)}/>}
      label="Is Cumulative"
      labelPlacement="start"
      sx={{ mr: 1 }}
    />
                        {/* <FormControlLabel
                          value="IsNonCumulative"
                          control={<Checkbox
                            checked={values?.IsNonCumulative}
                            onChange={(event) => setFieldValue('IsNonCumulative', event.target.checked)}
                          />}
                          label="Is Non Cumulative"
                          labelPlacement="bottom"
                        /> */}
                         <FormControlLabel
      value="IsNonCumulative"
      control={<Checkbox       checked={values?.IsNonCumulative}
      onChange={(event) => setFieldValue('IsNonCumulative', event.target.checked)}/>}
      label="Is Non Cumulative"
      labelPlacement="start"
      sx={{ mr: 1 }}
    />
                      </FormGroup>
                    </FormControl>
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

export default FixedDeposit;
