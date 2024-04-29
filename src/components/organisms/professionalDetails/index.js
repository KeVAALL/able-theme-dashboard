/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { annual_income, income_source, occupation } from 'constant/investorValidation';
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
            // handleChange={props.handleOnOccupationChange}
            setSelected={props.setSelectedOccupation}
            optionName="occupation_name"
            label="Occupation"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CustomAutoComplete
            options={annual_income}
            defaultValue={props.selectedAnnualIncome}
            setSelected={props.setSelectedAnnualIncome}
            // handleChange={(event) => {
            //   console.log(event.target.value);
            // }}
            optionName="annual_income"
            label="Annual Income"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CustomAutoComplete
            options={income_source}
            defaultValue={props.selectedIncomeSource}
            setSelected={props.setSelectedIncomeSource}
            // handleChange={(event) => {
            //   console.log(event.target.value);
            // }}
            optionName="income_source"
            label="Source of Income"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionalDetails;
