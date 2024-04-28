import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { occupation } from 'constant/investorValidation';
import React from 'react';
import { CustomAutoComplete } from 'utils/textfield';

const ProfessionalDetails = (props) => {
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CustomAutoComplete
            options={occupation}
            defaultValue={props.selectedOccupation}
            handleChange={props.handleOnOccupationChange}
            optionName="occupation_name"
            label="Occupation"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CustomAutoComplete
            options={autocompleteData}
            optionName="product_type"
            handleChange={(event) => {
              console.log(event.target.value);
            }}
            label="Annual Income"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CustomAutoComplete
            options={autocompleteData}
            optionName="product_type"
            handleChange={(event) => {
              console.log(event.target.value);
            }}
            label="Source of Income"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionalDetails;
