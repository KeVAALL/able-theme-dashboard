/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, Stack, CardHeader } from '@mui/material';
import AnimateButton from 'helpers/@extended/AnimateButton';
import { Additem } from 'iconsax-react';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export const SubmitButton = ({ title, changeTableVisibility, clearFormValues }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} />
      <Stack direction="row" alignItems="center" spacing={1.5} paddingRight={2.5}>
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
