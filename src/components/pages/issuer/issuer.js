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
import CustomTextField from 'utils/textfield';

function Issuer() {
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [issuerData, setIssuerData] = useState([]);
  useEffect(() => {
    console.log(isEditing);
  }, [isEditing]);

  // Custom cell component for rendering images
  const ImageCell = ({ value }) => {
    return (
      <TableCell>
        <img src={value} alt="Custom" style={{ width: '100%', height: 70 }} />
      </TableCell>
    );
  };

  const setEditing = (value) => {
    setIsEditing(!isEditing);
    setFormValues(value);
  };
  const setSearchData = (issuer) => {
    setIssuerData([issuer]);
  };

  const filterFormValues = {
    osb_issuer_id: ''
  };
  const formValueFields = [
    {
      fieldName: 'osb_issuer_id',
      label: 'OSB Issuer ID',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    osb_issuer_id: yup.string().required('Issuer ID is required')
  });

  // Add Form Values
  const formAllValues = {
    issuer_gst_number: '',
    issuer_name: '',
    issuer_pan: '',
    issuer_tollfree_number: '',
    logo_url: ''
  };
  const validationSchema = yup.object({
    issuer_gst_number: yup.string().required('Issuer GST Number is required'),
    issuer_name: yup.string().required('Issuer Name is required'),
    issuer_pan: yup.string().required('Issuer PAN is required'),
    issuer_tollfree_number: yup.string().required('Tollfree Number is required'),
    logo_url: yup.string().required('Logo URL is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const theme = useTheme();

  const columns = useMemo(
    () => [
      {
        Header: 'Issuer Name',
        accessor: 'issuer_name'
      },
      {
        Header: 'Issuer GST Number',
        accessor: 'issuer_gst_number'
      },
      {
        Header: 'Issuer PAN',
        accessor: 'issuer_pan'
      },
      {
        Header: 'Issuer Tollfree Number',
        accessor: 'issuer_tollfree_number'
      },
      {
        Header: 'Logo URL',
        accessor: 'logo_url',
        customCell: ImageCell
      }
    ],
    []
  );

  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  async function getOneIssuer(values) {
    const response = await axios.post('/issuer/getissuer', {
      method_name: 'getone',
      ...values
    });
    setSearchData(response.data.data);
  }
  async function getAllIssuer() {
    try {
      const response = await axios.post('/issuer/getissuer', {
        method_name: 'getall'
      });
      console.log(response);
      return response.data.data;
    } catch (err) {
      return err;
    }
  }
  const {
    isPending,
    error,
    refetch: issuerTableDataRefetch
  } = useQuery({
    queryKey: ['issuerTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: getAllIssuer,
    onSuccess: (data) => {
      setIssuerData(data);
    }
  });
  async function deleteOneIssuer(values) {
    console.log(values.osb_issuer_id);
    await axios.post('/issuer/saveissuer', {
      osb_issuer_id: values.osb_issuer_id,
      method_name: 'delete'
    });
    enqueueSnackbar('Issuer Deleted', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              const response = await axios.post('/issuer/saveissuer', {
                ...values,
                method_name: 'add',
                max_dp_fd_limit: 0,
                max_fd_nominee_limit: 0,
                max_pms_nominee_limit: 0,
                renewable_lower_bound: 0,
                renewable_upper_bound: 0,
                is_renewable: 0,
                user_id: 2
              });
              clearFormValues();
              enqueueSnackbar('Issuer added', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              issuerTableDataRefetch();
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              await axios.post('/issuer/saveissuer', { ...values, method_name: 'update' });
              clearFormValues();
              setIsEditing(!isEditing);
              enqueueSnackbar('Issuer Updated', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
              issuerTableDataRefetch();
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
                <SubmitButton title="Issuer Entry" changeTableVisibility={changeTableVisibility} clearFormValues={clearFormValues} />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    {/* issuer_name: issuer_pan issuer_tollfree_number logo_url */}
                    <Grid item xs={4}>
                      <CustomTextField
                        label="GST Number"
                        name="issuer_gst_number"
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
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Issuer Name"
                        name="issuer_name"
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
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Issuer PAN"
                        name="issuer_pan"
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
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Issuer Tollfree Number"
                        name="issuer_tollfree_number"
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
        <MainCard title="Issuer" changeTableVisibility={changeTableVisibility} showButton border sx={{ height: '100%', boxShadow: 1 }}>
          <MultiTable
            columns={columns}
            data={issuerData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={getOneIssuer}
            deleteOneItem={deleteOneIssuer}
            setSearchData={setSearchData}
            tableDataRefetch={issuerTableDataRefetch}
            // getData={getData}
          />
        </MainCard>
      )}
    </>
  );
}

export default Issuer;
