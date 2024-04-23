/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Dialog, Box, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card, Stack, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PopupTransition } from 'helpers/@extended/Transitions';
import CustomTextField from 'utils/textfield';
import { Formik } from 'formik';
import * as yup from 'yup';
import CardContent from 'themes/overrides/CardContent';

export function DialogForm({ openDialog, handleOpenDialog }) {
  const theme = useTheme();
  const formValues = {
    fd_name: '',
    issuer_name: ''
  };
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    issuer_name: yup.string().required('Issuer Name is required')
  });
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={handleOpenDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>Add Tenure</DialogTitle>
        <DialogContent>
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
                <Grid container spacing={3}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                </Grid>
              </Box>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
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
