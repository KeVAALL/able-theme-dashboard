import React, { useState } from 'react';
import { Checkbox, Grid, Typography, Stack, TextField } from '@mui/material';

import CustomTextField, { CustomAutoComplete } from 'utils/textfield';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { residency, marital_status } from 'constant/investorValidation';

const CustomChip = (props) => {
  console.log(props.values);
  // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
  const [value, setValue] = useState(new Date());

  // Autocomplete field state

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2} id="grid_box" sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={4}>
          <CustomAutoComplete
            options={residency}
            defaultValue={props.selectedResidenceID}
            handleChange={props.handleOnResidenceChange}
            // setSelected={props.setSelectedResidenceID}
            optionName="status"
            label="Resident Status"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomAutoComplete
            options={marital_status}
            defaultValue={props.selectedMarital}
            handleChange={props.handleOnMaritalChange}
            // setSelected={props.setSelectedMarital}
            optionName="status"
            label="Marital Status"
          />
        </Grid>

        <Grid
          id="__place_of_birth"
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date Desktop"
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomChip;

// const handleClick = (value) => {
//   switch (value) {
//     case 'Resident':
//       setSelected({ ...selected, isIndian: true });
//       break;
//     case '!Resident':
//       setSelected({ ...selected, isIndian: false });
//       break;
//     case 'Married':
//       setSelected({ ...selected, inMarried: true });
//       break;
//     default:
//       setSelected({ ...selected, inMarried: false });
//       break;
//   }
// };
// const [selected, setSelected] = useState({
//   isIndian: true,
//   inMarried: true,
//   placeOfBirth: ''
// });
{
  /* <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Indian Resident"
                color="success"
                variant={!selected?.isIndian ? 'outlined' : ''}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('Resident')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Non-Indian Resident (NRI)"
                color="success"
                variant={selected?.isIndian ? 'outlined' : ''}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('!Resident')}
              />
            </Grid> */
}
{
  /* <Stack id="__checkbox" gap={1} sx={{ mt: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Checkbox
          checked={personalTermCondition}
          onChange={(e) => setPersonalTermCondition(e.target.checked)}
          inputProps={{ 'aria-label': 'Same address' }}
        />

        <Typography sx={{ color: '#5E718D' }}>
          I hereby authorize Utkarsh Small Finance Bank Ltd to fetch my documents from UIDAI to setup my fixed deposit account.
        </Typography>
      </Stack> */
}