/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
  InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PopupTransition } from 'helpers/@extended/Transitions';
import CustomTextField from 'utils/textfield';
import { Formik } from 'formik';
import * as yup from 'yup';

export function DialogForm({ openDialog, handleOpenDialog, fdId, selectedPayoutMethod, clearFormValues, SaveInterestRate }) {
  const theme = useTheme();
  const formValues = {
    min_days: '',
    max_days: '',
    rate_of_interest_regular: '',
    rate_of_interest_senior_citizen: '',
    rate_of_interest_female: '',
    rate_of_interest_female_senior_citizen: ''
  };
  const validationSchema = yup.object({
    min_days: yup.string().required('Min Tenure is required'),
    max_days: yup.string().required('Max Tenure is required'),
    rate_of_interest_regular: yup.number().required('Rate is required'),
    rate_of_interest_senior_citizen: yup.number().required('Rate is required'),
    rate_of_interest_female: yup.number().required('Rate is required'),
    rate_of_interest_female_senior_citizen: yup.number().required('Rate is required')
  });
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={handleOpenDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box>
        <DialogTitle sx={{ p: 2 }}>Add Tenure</DialogTitle>
        <DialogContent sx={{ p: 2, overflowY: 'unset' }}>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              SaveInterestRate(values, fdId, selectedPayoutMethod, clearFormValues);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
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
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Max Tenure"
                      name="max_days"
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
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Regular ROI"
                      name="rate_of_interest_regular"
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
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button color="secondary" onClick={handleOpenDialog}>
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
      </Box>
    </Dialog>
  );
}
