import React, { useState } from 'react';
import { Box, Checkbox, Grid, Typography, Button } from '@mui/material';
import CustomTextField, { CustomAutoComplete } from 'utils/textfield';

const Nomination = () => {
  const [showSecondNominiee, setShowSecondNominiee] = useState(false);
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];
  return (
    <>
      {/* this is for the intro */}

      <Typography sx={{ color: '#5E718D' }} variant="p">
        Enter nominee details, so that the money invested could be easily claimed by nominees in the unfortunate event of demise of the
        investor
      </Typography>
      <>
        <Box id="__first_nominee" sx={{ marginTop: '12px' }}>
          <Typography sx={{ color: '#21B546', marginBottom: '0px', display: 'block' }} variant="p">
            First Nominee
          </Typography>

          <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Full Name
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
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Relationship
              </Typography>

              <CustomAutoComplete
                // options={[]}
                options={autocompleteData}
                optionName="product_type"
                // handleChange={() => {}}
                handleChange={(event) => {
                  console.log(event.target.value);
                }}
                label="Select relation with investor"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                  <Typography sx={{ fontWeight: '600' }} variant="p">
                    PAN
                  </Typography>
                  <CustomTextField
                    label="PAN of nominee"
                    name="pan_no"
                    values={''}
                    type="string"
                    onChange={() => {}}
                    onBlur={() => {}}
                    touched={() => {}}
                    errors={() => {}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                  <Typography sx={{ fontWeight: '600' }} variant="p">
                    Percent Share
                  </Typography>
                  <CustomTextField
                    label="Enter % share"
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
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <Typography sx={{ fontWeight: '600' }} variant="p">
                Date of Birth
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
        </Box>
        <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
          <Checkbox defaultChecked={false} />
          <Typography sx={{ color: '#5E718D', marginBottom: '12px' }} variant="p">
            Nominee’s address is same as investor’s address
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '20px' }}>
          <Button variant="outlined" onClick={() => setShowSecondNominiee(true)}>
            Add Nominee
          </Button>{' '}
          <Button variant="outlined" disabled>
            Save & Continue
          </Button>
        </Box>
      </>

      {showSecondNominiee && (
        <>
          <Box id="__first_nominee" sx={{ marginTop: '30px' }}>
            <Typography sx={{ color: '#21B546', marginBottom: '0px', display: 'block' }} variant="p">
              Second Nominee
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
              <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  Full Name
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
              <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  Relationship
                </Typography>

                <CustomAutoComplete
                  // options={[]}
                  options={autocompleteData}
                  optionName="product_type"
                  // handleChange={() => {}}
                  handleChange={(event) => {
                    console.log(event.target.value);
                  }}
                  label="Select relation with investor"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                    <Typography sx={{ fontWeight: '600' }} variant="p">
                      PAN
                    </Typography>
                    <CustomTextField
                      label="PAN of nominee"
                      name="pan_no"
                      values={''}
                      type="string"
                      onChange={() => {}}
                      onBlur={() => {}}
                      touched={() => {}}
                      errors={() => {}}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                    <Typography sx={{ fontWeight: '600' }} variant="p">
                      Percent Share
                    </Typography>
                    <CustomTextField
                      label="Enter % share"
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
              <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                <Typography sx={{ fontWeight: '600' }} variant="p">
                  Date of Birth
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
          </Box>
          <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
            <Checkbox defaultChecked />
            <Typography sx={{ color: '#5E718D', marginBottom: '12px' }} variant="p">
              Nominee’s address is same as investor’s address
            </Typography>
          </div>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '20px' }}>
            <Button variant="outlined" onClick={() => setShowSecondNominiee(true)}>
              Add Nominee
            </Button>{' '}
            <Button variant="outlined" disabled>
              Save & Continue
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Nomination;
