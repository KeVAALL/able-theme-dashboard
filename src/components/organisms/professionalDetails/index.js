import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CustomAutoComplete } from 'utils/textfield';

const ProfessionalDetails = () => {
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];

  return (
    <>
      {' '}
      {/* this is for the intro */}
      <Typography sx={{ color: '#5E718D' }} variant="p">
        Enter your occupation, income and source of income
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Occupation
          </Typography>

          <CustomAutoComplete
            // options={[]}
            options={autocompleteData}
            optionName="product_type"
            // handleChange={() => {}}
            handleChange={(event) => {
              console.log(event.target.value);
            }}
            label="Select your occupation"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Annual Income
          </Typography>

          <CustomAutoComplete
            // options={[]}
            options={autocompleteData}
            optionName="product_type"
            // handleChange={() => {}}
            handleChange={(event) => {
              console.log(event.target.value);
            }}
            label="Select your annual income"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Source of Income
          </Typography>

          <CustomAutoComplete
            // options={[]}
            options={autocompleteData}
            optionName="product_type"
            // handleChange={() => {}}
            handleChange={(event) => {
              console.log(event.target.value);
            }}
            label="Select your source of income"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionalDetails;
