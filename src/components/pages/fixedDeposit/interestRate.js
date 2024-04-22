import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Divider, Box, Card, Grid, CardContent, Button, Stack, CardHeader, FormControlLabel, Switch } from '@mui/material';
import AnimateButton from 'helpers/@extended/AnimateButton';
import { Additem } from 'iconsax-react';
import PropTypes from 'prop-types';
// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField from 'utils/textfield';
import MainCard from 'components/organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';
// assets
import {
  GetInterestRateData,
  GetOneInterestRate,
  SaveInterestRate,
  EditInterestRate,
  DeleteOneInterestRate
} from 'hooks/interestRate/interestRate';
import { DialogForm } from 'components/atoms/dialog/formdialog';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export default function InterestRate({ changeTableVisibility, isNotEditingInterestRate }) {
  // Search one item state
  const setSearchData = (interestRate) => {
    setIssuerData(interestRate);
  };
  const [showActionHeadButton, setShowActionHeadButton] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  // Search one item form fields
  //   const filterFormValues = {
  //     issuer_name: ''
  //   };
  //   const formValueFields = [
  //     {
  //       fieldName: 'issuer_name',
  //       label: 'Issuer Name',
  //       type: 'text'
  //     }
  //   ];
  //   const filterValidationSchema = yup.object({
  //     issuer_name: yup.string().required('Issuer Name is required')
  //   });
  // Add form Values
  const formAllValues = {
    fd_name: '',
    issuer_name: ''
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    issuer_name: yup.string().required('Issuer Name is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const setEditing = (value) => {
    setFormValues(value);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  // Custom fields/ columns
  const theme = useTheme();
  const columns = useMemo(
    () => [
      {
        Header: 'Tenure',
        accessor: 'tenure'
      },
      {
        Header: 'Normal Citizen',
        accessor: 'normal_citizen'
      },
      {
        Header: 'Senior Citizen',
        accessor: 'senior_citizen'
      },
      {
        Header: 'Female Citizen',
        accessor: 'female_citizen'
      },
      {
        Header: 'Senior Female Citizen',
        accessor: 'senior_female_citizen'
      }
    ],
    []
  );
  const interestData = [
    // {
    //   tenure: '51-59',
    //   normal_citizen: 'Akshyad',
    //   senior_citizen: '5%',
    //   female_citizen: '6%',
    //   senior_female_citizen: '10%'
    // }
  ];

  return (
    <Stack spacing={2}>
      <DialogForm openDialog={openDialog} handleOpenDialog={handleOpenDialog} />
      <Formik initialValues={formValues} validationSchema={validationSchema} onSubmit={async (values, { resetForm }) => {}}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
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
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title="Interest Rate" />
                <Stack direction="row" alignItems="center" spacing={1.5} paddingRight={2.5}>
                  {isEditing ? (
                    <Box>
                      <FormControlLabel
                        value="start"
                        control={
                          <Switch
                            color="primary"
                            checked={isActive}
                            onChange={() => {
                              setIsActive(!isActive);
                            }}
                          />
                        }
                        // control={<Switch color="primary" checked={isActive} onChange={setIsActive} />}
                        label="Active"
                        labelPlacement="start"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Box>
                    <AnimateButton>
                      <Button variant="contained" color="success" startIcon={<Additem />} type="submit">
                        Show
                      </Button>
                    </AnimateButton>
                  </Box>
                  <Box>
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="button"
                        onClick={() => {
                          isNotEditingInterestRate();
                        }}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                  </Box>
                </Stack>
              </Stack>

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
                  <Grid item xs={4}></Grid>

                  <Grid item xs={12}>
                    <MultiTable
                      columns={columns}
                      data={interestData}
                      //   formValues={filterFormValues}
                      //   formValueFields={formValueFields}
                      //   validationSchema={filterValidationSchema}
                      changeTableVisibility={changeTableVisibility}
                      setEditing={setEditing}
                      getOneItem={GetOneInterestRate}
                      deleteOneItem={DeleteOneInterestRate}
                      setSearchData={setSearchData}
                      //   tableDataRefetch={issuerTableDataRefetch}
                      setActiveEditing={setActiveEditing}
                      showActionHeadButton={showActionHeadButton}
                      handleIROpenDialog={handleOpenDialog}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </Formik>
    </Stack>
  );
}

InterestRate.propTypes = {
  setActiveClose: PropTypes.any
};
