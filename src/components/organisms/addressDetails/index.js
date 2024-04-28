import { Checkbox, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from 'utils/textfield';

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
            <CustomTextField
              label="Address Line 1"
              name="address_line_1"
              values={props.values.investor_address}
              type="string"
              onChange={() => {}}
              onBlur={() => {}}
              touched={() => {}}
              errors={() => {}}
            />
          </Grid>
          <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
            <CustomTextField
              label="Address Line 2"
              name="address_line_2"
              values={props.values.investor_address}
              type="string"
              onChange={() => {}}
              onBlur={() => {}}
              touched={() => {}}
              errors={() => {}}
            />
          </Grid>

          <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CustomTextField
                label="Pincode"
                name="pincode"
                values={props.values.investor_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CustomTextField
                label="City"
                name="city"
                values={props.values.investor_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
          </Grid>
          <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CustomTextField
                label="Pincode"
                name="pincode"
                values={props.values.investor_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CustomTextField
                label="City"
                name="city"
                values={props.values.investor_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
        <Checkbox checked={sameAddress} onChange={handleCheckboxChange} inputProps={{ 'aria-label': 'Same address' }} />
        <Typography sx={{ color: '#5E718D', marginBottom: '20px' }} variant="p">
          My Correspondent Address is same as my Permanent Address
        </Typography>
      </div>

      {!sameAddress && (
        <div id="__permanent _address" style={{ marginTop: '12px', marginBottom: '12px' }}>
          <Typography sx={{ color: '#21B546', marginBottom: '12px', display: 'block' }} variant="p">
            Correspondent Address
          </Typography>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <CustomTextField
                label="Address Line 1"
                name="address_line_1"
                values={props.values.correspondent_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <CustomTextField
                label="Address Line 2"
                name="address_line_2"
                values={props.values.correspondent_address}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>

            <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomTextField
                  label="Pincode"
                  name="pincode"
                  values={props.values.correspondent_address}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomTextField
                  label="City"
                  name="city"
                  values={props.values.correspondent_address}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
            </Grid>
            <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomTextField
                  label="Pincode"
                  name="pincode"
                  values={props.values.correspondent_address}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomTextField
                  label=" City"
                  name="city"
                  values={props.values.correspondent_address}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default AddressDetails;
