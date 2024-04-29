/* eslint-disable react/prop-types */
import { Checkbox, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField, { NestedCustomTextField } from 'utils/textfield';

const AddressDetails = (props) => {
  // is_permanent_address_correspond
  const [sameAddress, setSameAddress] = useState(false);
  const handleCheckboxChange = (event) => {
    setSameAddress(event.target.checked);
  };
  return (
    <>
      <div id="__permanent _address" style={{ marginBottom: '12px' }}>
        <Typography sx={{ color: '#21B546', marginBottom: '12px', display: 'block' }} variant="p">
          Permanent Address
        </Typography>

        <Grid container spacing={3}>
          <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
            <NestedCustomTextField
              label="Address Line 1"
              valueName="investor_address.address_line_1"
              values={props.values.investor_address.address_line_1}
              type="string"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touched={props.touched}
              errors={props.errors}
            />
          </Grid>
          <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
            <NestedCustomTextField
              label="Address Line 2"
              valueName="investor_address.address_line_2"
              values={props.values.investor_address.address_line_2}
              type="string"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touched={props.touched}
              errors={props.errors}
            />
          </Grid>

          <Grid item sm={6} xs={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <NestedCustomTextField
              label="Pincode"
              valueName="investor_address.pincode"
              values={props.values.investor_address.pincode}
              type="string"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touched={props.touched}
              errors={props.errors}
            />
          </Grid>

          <Grid item sm={6} xs={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <NestedCustomTextField
              label="City"
              valueName="investor_address.city"
              values={props.values.investor_address.city}
              type="string"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              touched={props.touched}
              errors={props.errors}
            />
          </Grid>
        </Grid>
      </div>
      <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
        <Checkbox checked={sameAddress} onChange={handleCheckboxChange} inputProps={{ 'aria-label': 'Same address' }} />
        <Typography sx={{ color: '#5E718D', marginBottom: '20px' }} variant="p">
          Correspondent Address is same as Permanent Address
        </Typography>
      </div>

      {!sameAddress && (
        <div id="__permanent _address" style={{ marginTop: '12px', marginBottom: '12px' }}>
          <Typography sx={{ color: '#21B546', marginBottom: '12px', display: 'block' }} variant="p">
            Correspondent Address
          </Typography>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <NestedCustomTextField
                label="Address Line 1"
                valueName="correspondent_address.address_line_1"
                values={props.values.correspondent_address.address_line_1}
                type="string"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touched={props.touched}
                errors={props.errors}
              />
            </Grid>
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <NestedCustomTextField
                label="Address Line 2"
                valueName="correspondent_address.address_line_2"
                values={props.values.correspondent_address.address_line_2}
                type="string"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touched={props.touched}
                errors={props.errors}
              />
            </Grid>

            <Grid item sm={6} xs={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <NestedCustomTextField
                label="Pincode"
                valueName="correspondent_address.pincode"
                values={props.values.correspondent_address.pincode}
                type="string"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touched={props.touched}
                errors={props.errors}
              />
            </Grid>

            <Grid item sm={6} xs={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <NestedCustomTextField
                label="City"
                valueName="correspondent_address.city"
                values={props.values.correspondent_address.city}
                type="string"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touched={props.touched}
                errors={props.errors}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default AddressDetails;
