/* eslint-disable react/prop-types */
import React from 'react';
import { Divider, Box, Card, Button, Grid, InputLabel, Stack, TextField, CardHeader, CardContent } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export const SubmitButton = ({ changeTableVisibility, clearFormValues }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title="Form" />
      <Stack direction="row" alignItems="center" spacing={2.5} paddingRight={2.5}>
        <Box>
          <AnimateButton>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </AnimateButton>
        </Box>
        <Box>
          <AnimateButton>
            <Button
              variant="outlined"
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
