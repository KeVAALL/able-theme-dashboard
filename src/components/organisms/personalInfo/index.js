import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Checkbox, Grid, Typography } from '@mui/material';

import CustomTextField from 'utils/textfield';
import { Box } from '@mui/system';

const CustomChip = () => {
  const [personalTermCondition, setPersonalTermCondition] = useState(false);

  const [selected, setSelected] = useState({
    isIndian: true,
    inMarried: true,
    placeOfBirth: ''
  });
  const handleClick = (value) => {
    switch (value) {
      case 'Resident':
        setSelected({ ...selected, isIndian: true });
        break;
      case '!Resident':
        setSelected({ ...selected, isIndian: false });
        break;
      case 'Married':
        setSelected({ ...selected, inMarried: true });
        break;
      default:
        setSelected({ ...selected, inMarried: false });
        break;
    }
  };

  return (
    <>
      {/* {/ this is for the intro /} */}
      <Typography sx={{ color: '#5E718D' }} variant="p">
        Choose what best defines you. Your FD will be made under this information.
      </Typography>

      <Grid container spacing={2} id="grid_box" sx={{ marginTop: '12px', marginBottom: '20px' }}>
        <Grid
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
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Resident Status
          </Typography>
          <Grid container spacing={1} id="grid_box">
            {/* {/ <Grid item xs={4} sm={4} md={6} lg={6}> /} */}
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Indian Resident"
                color="primary"
                variant={!selected?.isIndian ? 'outlined' : ''}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('Resident')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Non-Indian Resident (NRI)"
                color="primary"
                variant={selected?.isIndian ? 'outlined' : ''}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('!Resident')}
              />
            </Grid>
            {/* {/ Add more Grid items as needed /}/ */}
          </Grid>
        </Grid>
        <Grid
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
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Marital Status
          </Typography>
          <Grid container spacing={1} id="grid_box">
            {/* {/ <Grid item xs={4} sm={4} md={6} lg={6}> /} */}
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Married"
                color="primary"
                variant={!selected?.inMarried ? 'outlined' : ''}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('Married')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Chip
                label="Unmarried"
                color="primary"
                variant={!selected?.inMarried ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleClick('!Married')}
              />
            </Grid>
            {/* {/ Add more Grid items as needed /} */}
          </Grid>
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
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Place of Birth
          </Typography>
          <CustomTextField
            label="Place of Birth "
            name="pan_no"
            values={selected?.placeOfBirth}
            type="string"
            onChange={() => {}}
            onBlur={() => {}}
            touched={() => {}}
            errors={() => {}}
          />
        </Grid>
      </Grid>
      <div id="__checkbox" style={{ marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
        {/* {/ <Checkbox defaultChecked /> /} */}
        <Checkbox
          checked={personalTermCondition}
          onChange={(e) => setPersonalTermCondition(e.target.checked)}
          inputProps={{ 'aria-label': 'Same address' }}
        />

        <Typography sx={{ color: '#5E718D', marginBottom: '12px' }} variant="p">
          I hereby authorize Utkarsh Small Finance Bank Ltd to fetch my documents from UIDAI to setup my fixed deposit account.
        </Typography>
      </div>
    </>
  );
};

export default CustomChip;
