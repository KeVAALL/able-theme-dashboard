/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  Stack,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PopupTransition } from 'helpers/@extended/Transitions';
import CustomTextField from 'utils/textfield';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from '../loader/Loader';

export function DialogForm({
  openDialog,
  handleOpenDialog,
  schemeEditFormValues,
  fdId,
  selectedPayoutMethod,
  clearFormValues,
  SaveInterestRate,
  setIsActive,
  isActive,
  isEditingScheme,
  setActiveClose
}) {
  // const [isLoading, setIsLoading] = useState(true);

  const formAllSchemeValues = {
    min_days: '8',
    max_days: '',
    rate_of_interest_regular: '',
    rate_of_interest_senior_citezen: '',
    rate_of_interest_female: '',
    rate_of_interest_female_senior_citezen: ''
  };
  // const [schemeFormValues, setSchemeFormValues] = useState(formAllSchemeValues);
  const [schemeFormValues, setSchemeFormValues] = useState();

  const validationSchema = yup.object({
    min_days: yup.number().required('Min Tenure is required'),
    max_days: yup.number().required('Max Tenure is required'),
    rate_of_interest_regular: yup.number().required('Rate is required'),
    rate_of_interest_senior_citezen: yup.number().required('Rate is required'),
    rate_of_interest_female: yup.number().required('Rate is required'),
    rate_of_interest_female_senior_citezen: yup.number().required('Rate is required')
  });

  useEffect(() => {
    // console.warn(isEditingScheme);
    // console.warn(schemeEditFormValues);
    setSchemeFormValues(schemeEditFormValues);
    // setSchemeFormValues({
    //   scheme_master_id: 7,
    //   fd_id: 1,
    //   min_days: 540,
    //   max_days: 600,
    //   tenure: '540-600',
    //   fd_payout_method: 'NC1',
    //   rate_of_interest_regular: 7.91,
    //   rate_of_interest_female: 7.67,
    //   rate_of_interest_senior_citezen: 7.92,
    //   rate_of_interest_female_senior_citezen: 7.91,
    //   fd_type: 'NC',
    //   is_active: 1
    // });
    console.log('acacs');
    // }, [schemeEditFormValues, isEditingScheme]);
  }, [schemeEditFormValues]);

  // if (isLoading) return <Loader />;

  return (
    <Dialog
      open={openDialog}
      // open={true}
      TransitionComponent={PopupTransition}
      // keepMounted
      onClose={handleOpenDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box>
        <DialogTitle sx={{ p: 2 }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Add Tenure</Typography>
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
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 2, overflowY: 'unset' }}>
          <Formik
            // initialValues={{
            //   scheme_master_id: 7,
            //   fd_id: 1,
            //   min_days: 540,
            //   max_days: 600,
            //   tenure: '540-600',
            //   fd_payout_method: 'NC1',
            //   rate_of_interest_regular: 7.91,
            //   rate_of_interest_female: 7.67,
            //   rate_of_interest_senior_citezen: 7.92,
            //   rate_of_interest_female_senior_citezen: 7.91,
            //   fd_type: 'NC',
            //   is_active: 1
            // }}
            // initialValues={schemeEditFormValues || schemeFormValues}
            initialValues={schemeFormValues || formAllSchemeValues}
            // initialValues={schemeFormValues ? schemeFormValues : formAllSchemeValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              // SaveInterestRate(values, fdId, selectedPayoutMethod, clearFormValues);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <Box
                component="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  console.log(values);
                  handleSubmit();
                }}
                sx={{ width: '100%' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Min Tenure"
                      name="min_days"
                      // values={{
                      //   scheme_master_id: 7,
                      //   fd_id: 1,
                      //   min_days: 540,
                      //   max_days: 600,
                      //   tenure: '540-600',
                      //   fd_payout_method: 'NC1',
                      //   rate_of_interest_regular: 7.91,
                      //   rate_of_interest_female: 7.67,
                      //   rate_of_interest_senior_citezen: 7.92,
                      //   rate_of_interest_female_senior_citezen: 7.91,
                      //   fd_type: 'NC',
                      //   is_active: 1
                      // }}
                      values={values}
                      type="number"
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
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Max Tenure"
                      name="max_days"
                      values={values}
                      type="number"
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
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI"
                      name="rate_of_interest_regular"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI"
                      name="rate_of_interest_senior_citezen"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI"
                      name="rate_of_interest_female"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI"
                      name="rate_of_interest_female_senior_citezen"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
          <DialogActions sx={{ p: 2 }}>
            <Button
              color="secondary"
              onClick={() => {
                handleOpenDialog();
                setActiveClose();
                // clearFormValues();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleOpenDialog();
              }}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
