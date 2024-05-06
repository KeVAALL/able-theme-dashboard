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
// third-party
import { PopupTransition } from 'helpers/@extended/Transitions';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from '../loader/Loader';
// assets
import CustomTextField from 'utils/textfield';
import { formAllSchemeValues, validationSchema } from 'constant/interestRateSchemeValidation';
import { SaveInterestRate, EditInterestRate } from 'hooks/interestRate/interestRate';

export function DialogForm({
  openDialog,
  handleOpenDialog,
  schemeEditFormValues,
  fdId,
  selectedPayoutMethod,
  setIsActive,
  isActive,
  isEditingScheme,
  setActiveClose,
  setSchemeData
}) {
  // Active or not Button
  const [activeButton, setActiveButton] = useState(false);
  const [liveButton, setLiveButton] = useState(false);
  // Form Data
  const [schemeFormValues, setSchemeFormValues] = useState();
  const clearFormValues = () => {
    setSchemeFormValues(formAllSchemeValues);
    setActiveButton(false);
  };

  useEffect(() => {
    console.warn(schemeEditFormValues);

    if (isEditingScheme === false) {
      clearFormValues();
    }
    if (schemeEditFormValues && isEditingScheme === true) {
      setActiveButton(schemeEditFormValues.is_active);
      setLiveButton(schemeEditFormValues.is_live);
      setSchemeFormValues(schemeEditFormValues);
    }
  }, [schemeEditFormValues, isEditingScheme]);

  // if (isLoading) return <Loader />;

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={PopupTransition}
      onClose={handleOpenDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box>
        <DialogTitle sx={{ p: 2 }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Add Tenure</Typography>
            <Stack flexDirection="row">
              <Box>
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      checked={activeButton}
                      onChange={() => {
                        setActiveButton(!activeButton);
                      }}
                    />
                  }
                  label="Active"
                  labelPlacement="start"
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="live"
                  control={
                    <Switch
                      color="primary"
                      checked={liveButton}
                      onChange={() => {
                        setLiveButton(!liveButton);
                      }}
                    />
                  }
                  label="Live"
                  labelPlacement="start"
                  sx={{ mr: 1 }}
                />
              </Box>
            </Stack>
          </Stack>
        </DialogTitle>
        <Formik
          initialValues={schemeFormValues || formAllSchemeValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log(isEditingScheme);
            console.log(values);
            if (isEditingScheme) {
              console.log(activeButton);
              EditInterestRate(values, activeButton, liveButton, clearFormValues, handleOpenDialog, setSchemeData, setActiveClose);
            } else {
              SaveInterestRate(values, fdId, selectedPayoutMethod, isActive, clearFormValues, handleOpenDialog, setSchemeData);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
            <DialogContent sx={{ p: 2, overflowY: 'unset' }}>
              <Box
                component="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                sx={{ width: '100%' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Min Tenure"
                      name="min_days"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled={!activeButton ? false : true}
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
                      disabled={!activeButton ? false : true}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI %"
                      name="rate_of_interest_regular"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled={!activeButton ? false : true}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Senior Citizen ROI %"
                      name="rate_of_interest_senior_citezen"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled={!activeButton ? false : true}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Female ROI %"
                      name="rate_of_interest_female"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled={!activeButton ? false : true}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Female Senior Citizen ROI %"
                      name="rate_of_interest_female_senior_citezen"
                      values={values}
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled={!activeButton ? false : true}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button
                    color="secondary"
                    onClick={() => {
                      handleOpenDialog();
                      setActiveClose();
                      clearFormValues();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={() => {
                      // handleOpenDialog();
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}

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

// initialValues={schemeEditFormValues || schemeFormValues}