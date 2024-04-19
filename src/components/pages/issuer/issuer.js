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
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField from 'utils/textfield';

// assets
import { GetIssuerData, GetOneIssuer, SaveIssuer, EditIssuer, DeleteOneIssuer } from 'hooks/issuer/issuer';
import { toInteger } from 'lodash';

function Issuer() {
  const [showTable, setShowTable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isIssuerActive, setIssuerActive] = useState();
  const [issuerData, setIssuerData] = useState([]);
  const theme = useTheme();

  // Custom cell component for rendering images
  const ImageCell = ({ value }) => {
    return (
      <TableCell style={{ paddingLeft: '0px' }}>
        <img src={value} alt="Custom" style={{ width: '90%', height: 60 }} />
      </TableCell>
    );
  };
  const StatusCell = ({ value }) => {
    return value === 0 ? 'Not Active' : 'Active';
  };

  const setEditing = (value) => {
    setFormValues(value);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const setSearchData = (issuer) => {
    setIssuerData(issuer);
  };
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const handleIsIssuerActive = (initialValue) => {
    setIssuerActive(initialValue);
  };

  const filterFormValues = {
    issuer_name: ''
  };
  const formValueFields = [
    {
      fieldName: 'issuer_name',
      label: 'Issuer Name',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    issuer_name: yup.string().required('Issuer Name is required')
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

  const [formValues, setFormValues] = useState(formAllValues);

  const columns = useMemo(
    () => [
      {
        Header: 'Logo URL',
        accessor: 'logo_url',
        customCell: ImageCell
      },
      {
        Header: 'Issuer Name',
        accessor: 'issuer_name'
      },
      {
        Header: 'Tollfree Number',
        accessor: 'issuer_tollfree_number'
      },
      {
        Header: 'Status',
        accessor: 'is_active',
        customCell: StatusCell
      }
    ],
    []
  );

  const {
    isPending,
    error,
    refetch: issuerTableDataRefetch
  } = useQuery({
    queryKey: ['issuerTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetIssuerData,
    onSuccess: (data) => {
      setIssuerData(data);
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
              SaveIssuer(values, issuerTableDataRefetch, clearFormValues);
            }
            if (isEditing === true) {
              console.log({ ...values, is_active: toInteger(isIssuerActive), method_name: 'update' });
              EditIssuer(values, isIssuerActive, issuerTableDataRefetch, clearFormValues, setActiveClose);
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
                <SubmitButton
                  title="Issuer Entry"
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsIssuerActive}
                  isActive={isIssuerActive}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
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
        <MainCard
          title="Issuer"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <MultiTable
            columns={columns}
            data={issuerData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneIssuer}
            deleteOneItem={DeleteOneIssuer}
            setSearchData={setSearchData}
            tableDataRefetch={issuerTableDataRefetch}
            setActiveEditing={setActiveEditing}
          />
        </MainCard>
      )}
    </>
  );
}

export default Issuer;
