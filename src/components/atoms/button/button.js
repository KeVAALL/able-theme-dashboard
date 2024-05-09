/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import React, { useEffect, memo } from 'react';
import { Box, Button, Stack, CardHeader, FormControlLabel, Switch } from '@mui/material';
import { useLocation } from 'react-router';
import AnimateButton from 'helpers/@extended/AnimateButton';
import { Additem, Eye } from 'iconsax-react';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export const SubmitButton = memo(
  ({
    title,
    buttonTitle,
    handleOpenDialog,
    changeTableVisibility,
    clearFormValues,
    isEditing,
    formValues,
    setActiveClose,
    setIsActive,
    isActive,
    errors,
    handleTabError
  }) => {
    useEffect(() => {
      console.log(location.pathname);
      if (setIsActive) {
        setIsActive(formValues.is_active);
      }
    }, [formValues?.is_active]);

    const CancelForm = () => {
      changeTableVisibility();
      if (setActiveClose) {
        setActiveClose();
      }
      clearFormValues();
    };

    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} />
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

          {/* <Box>
            <AnimateButton>
              <Button variant="contained" color="success" startIcon={<Additem />} type="submit">
                {buttonTitle ? buttonTitle : 'Submit'}
              </Button>
            </AnimateButton>
          </Box> */}
          {location.pathname === '/transaction/investment' ? (
            <Box>
              <AnimateButton>
                <Button variant="contained" color="success" startIcon={<Eye />} type="submit">
                  {buttonTitle}
                </Button>
              </AnimateButton>
            </Box>
          ) : (
            <Box>
              <AnimateButton>
                <Button variant="contained" color="success" startIcon={<Additem />} type="submit">
                  Submit
                </Button>
              </AnimateButton>
            </Box>
          )}
          <Box>
            <AnimateButton>
              <Button variant="outlined" color="secondary" type="button" onClick={CancelForm}>
                Cancel
              </Button>
            </AnimateButton>
          </Box>
        </Stack>
      </Stack>
    );
  }
);

SubmitButton.PropTypes = {
  buttonTitle: PropTypes.any,
  handleOpenDialog: PropTypes.any,
  errors: PropTypes.any,
  handleTabError: PropTypes.any
};
