import { Checkbox, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from 'utils/textfield';

const AddressDetails = () => {
  const [sameAddress, setSameAddress] = useState(false);
  const handleCheckboxChange = (event) => {
    setSameAddress(event.target.checked);
  };
  return (
    <>
      {/* this is for the intro */}
      <Typography sx={{ color: '#5E718D' }} variant="p">
        Enter your permanent and correspondence address below.
      </Typography>
      <div id="__permanent _address" style={{ marginTop: '20px', marginBottom: '12px' }}>
        <Typography sx={{ color: '#21B546', marginBottom: '12px', display: 'block' }} variant="p">
          Permanent Address
        </Typography>

        <Grid container spacing={1}>
          {/* //grid */}
          {/* <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBlock: '20px' }}> */}
          <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
            <Typography sx={{ fontWeight: '600' }} variant="p">
              Address Line 1
            </Typography>
            <CustomTextField
              label="Apartment, Building, House"
              name="pan_no"
              values={''}
              type="string"
              onChange={() => {}}
              onBlur={() => {}}
              touched={() => {}}
              errors={() => {}}
            />
          </Grid>
          {/* //grid */}
          <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
            <Typography sx={{ fontWeight: '600' }} variant="p">
              Address Line 2
            </Typography>
            <CustomTextField
              label="Street, Locality, Area"
              name="pan_no"
              values={''}
              type="string"
              onChange={() => {}}
              onBlur={() => {}}
              touched={() => {}}
              errors={() => {}}
            />
          </Grid>

          <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Pincode
              </Typography>
              <CustomTextField
                label="Enter Pincode"
                name="pan_no"
                values={''}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                City
              </Typography>
              <CustomTextField
                label="Enter City"
                name="pan_no"
                values={''}
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
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Pincode
              </Typography>
              <CustomTextField
                label="Enter Pincode"
                name="pan_no"
                values={''}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                City
              </Typography>
              <CustomTextField
                label="Enter City"
                name="pan_no"
                values={''}
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

          <Grid container spacing={1}>
            {/* //grid */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBlock: '20px' }}> */}
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Address Line 1
              </Typography>
              <CustomTextField
                label="Apartment, Building, House"
                name="pan_no"
                values={''}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>
            {/* //grid */}
            <Grid item sm={6} xs={12} style={{ display: 'grid', gap: '8px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Address Line 2
              </Typography>
              <CustomTextField
                label="Street, Locality, Area"
                name="pan_no"
                values={''}
                type="string"
                onChange={() => {}}
                onBlur={() => {}}
                touched={() => {}}
                errors={() => {}}
              />
            </Grid>

            <Grid id="__pin-code_&_city" item sm={6} xs={12} container spacing={1} sx={{ rowGap: '80px' }}>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  Pincode
                </Typography>
                <CustomTextField
                  label="Enter Pincode"
                  name="pan_no"
                  values={''}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  City
                </Typography>
                <CustomTextField
                  label="Enter City"
                  name="pan_no"
                  values={''}
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
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  Pincode
                </Typography>
                <CustomTextField
                  label="Enter Pincode"
                  name="pan_no"
                  values={''}
                  type="string"
                  onChange={() => {}}
                  onBlur={() => {}}
                  touched={() => {}}
                  errors={() => {}}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  City
                </Typography>
                <CustomTextField
                  label="Enter City"
                  name="pan_no"
                  values={''}
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
