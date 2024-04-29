/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Checkbox, Grid, Typography, Button } from '@mui/material';
import CustomTextField, { CustomAutoComplete, NestedCustomTextField } from 'utils/textfield';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { relationship } from 'constant/investorValidation';

const Nomination = (props) => {
  console.log(props.values);
  const [showSecondNominiee, setShowSecondNominiee] = useState(false);
  const [value, setValue] = useState(new Date());
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <>
        <Box id="__first_nominee">
          <Typography sx={{ color: '#21B546', marginBottom: '0px', display: 'block' }} variant="p">
            First Nominee
          </Typography>

          <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <NestedCustomTextField
                label="Full Name"
                valueName="nominee.full_name"
                values={props.values.nominee.full_name}
                type="string"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                touched={props.touched}
                errors={props.error}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <CustomAutoComplete
                options={relationship}
                defaultValue={props.selectedRelation}
                setSelected={props.setSelectedRelation}
                optionName="relation_name"
                label="Relationship with Investor"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={12} style={{ display: 'grid', gap: '10px' }}>
                  <NestedCustomTextField
                    label="PAN of Nominee"
                    valueName="nominee.pan"
                    values={props.values.nominee.pan}
                    type="string"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    touched={props.touched}
                    errors={props.error}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
                  <CustomTextField
                    label="Percent Share (%)"
                    name="pan_no"
                    values={''}
                    type="string"
                    onChange={() => {}}
                    onBlur={() => {}}
                    touched={() => {}}
                    errors={() => {}}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  className="calendar_main"
                  label="DOB"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default Nomination;

{
  /* <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
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
        </Box> */
}
// {showSecondNominiee && (
//   <>
//     <Box id="__first_nominee" sx={{ marginTop: '30px' }}>
//       <Typography sx={{ color: '#21B546', marginBottom: '0px', display: 'block' }} variant="p">
//         Second Nominee
//       </Typography>

//       <Grid container spacing={2} sx={{ marginTop: '0px' }}>
//         <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//           <Typography sx={{ fontWeight: '600' }} variant="p">
//             Full Name
//           </Typography>

//           <CustomTextField
//             label="Apartment, Building, House"
//             name="pan_no"
//             values={''}
//             type="string"
//             onChange={() => {}}
//             onBlur={() => {}}
//             touched={() => {}}
//             errors={() => {}}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//           <Typography sx={{ fontWeight: '600' }} variant="p">
//             Relationship
//           </Typography>

//           <CustomAutoComplete
//             // options={[]}
//             options={autocompleteData}
//             optionName="product_type"
//             // handleChange={() => {}}
//             handleChange={(event) => {
//               console.log(event.target.value);
//             }}
//             label="Select relation with investor"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//           <Grid container spacing={1}>
//             <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//               <Typography sx={{ fontWeight: '600' }} variant="p">
//                 PAN
//               </Typography>
//               <CustomTextField
//                 label="PAN of nominee"
//                 name="pan_no"
//                 values={''}
//                 type="string"
//                 onChange={() => {}}
//                 onBlur={() => {}}
//                 touched={() => {}}
//                 errors={() => {}}
//               />
//             </Grid>
//             <Grid item xs={6} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//               <Typography sx={{ fontWeight: '600' }} variant="p">
//                 Percent Share
//               </Typography>
//               <CustomTextField
//                 label="Enter % share"
//                 name="pan_no"
//                 values={''}
//                 type="string"
//                 onChange={() => {}}
//                 onBlur={() => {}}
//                 touched={() => {}}
//                 errors={() => {}}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6} style={{ display: 'grid', gap: '10px' }}>
//           <Typography sx={{ fontWeight: '600' }} variant="p">
//             Date of Birth
//           </Typography>

//           <CustomAutoComplete
//             // options={[]}
//             options={autocompleteData}
//             optionName="product_type"
//             // handleChange={() => {}}
//             handleChange={(event) => {
//               console.log(event.target.value);
//             }}
//             label="Select your source of income"
//           />
//         </Grid>
//       </Grid>
//     </Box>
//     <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
//       <Checkbox defaultChecked />
//       <Typography sx={{ color: '#5E718D', marginBottom: '12px' }} variant="p">
//         Nominee’s address is same as investor’s address
//       </Typography>
//     </div>
//     <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '20px' }}>
//       <Button variant="outlined" onClick={() => setShowSecondNominiee(true)}>
//         Add Nominee
//       </Button>{' '}
//       <Button variant="outlined" disabled>
//         Save & Continue
//       </Button>
//     </Box>
//   </>
// )}
