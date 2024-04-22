/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, CardHeader, FormControlLabel, Switch } from '@mui/material';
import AnimateButton from 'helpers/@extended/AnimateButton';
import { Additem } from 'iconsax-react';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export const SubmitButton = ({
  title,
  changeTableVisibility,
  clearFormValues,
  isEditing,
  formValues,
  setActiveClose,
  setIsActive,
  isActive
}) => {
  // const [isActive, setIsActive] = useState();

  useEffect(() => {
    setIsActive(formValues.is_active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.is_active]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} />
      <Stack direction="row" alignItems="center" spacing={1.5} paddingRight={2.5}>
        {isEditing && (
          <Box>
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  // checked={Boolean(formValues.is_active)}
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
        )}

        <Box>
          <AnimateButton>
            <Button variant="contained" color="success" startIcon={<Additem />} type="submit">
              Submit
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
                changeTableVisibility();
                setActiveClose();
                clearFormValues();
              }}
            >
              Cancel
            </Button>
          </AnimateButton>
        </Box>
      </Stack>
    </Stack>
  );
};