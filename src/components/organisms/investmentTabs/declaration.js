/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Grid, Typography, Chip, Button, Divider } from '@mui/material';

const Declaration = ({ selectedDeclaration, handleDeclarationClick }) => {
  return (
    <>
      <Grid id="__parent" container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Politically Exposed Person (PEP)?
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="Yes"
                color="success"
                variant={selectedDeclaration.isPoliticallyExposed ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('PoliticallyExposed')}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="No"
                color="success"
                variant={!selectedDeclaration.isPoliticallyExposed ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('PoliticallyExposed')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            Relative to politically exposed person (PEP)?
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="Yes"
                color="success"
                variant={selectedDeclaration.isRelativeToPoliticallyExposed ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('RelativeToPoliticallyExposed')}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="No"
                color="success"
                variant={!selectedDeclaration.isRelativeToPoliticallyExposed ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('RelativeToPoliticallyExposed')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'grid', gap: '10px' }}>
          <Typography sx={{ fontWeight: '600' }} variant="p">
            A citizen national or tax resident of any other country outside India?
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="Yes"
                color="success"
                variant={selectedDeclaration.isResidentOutsideIndia ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('ResidentOutsideIndia')}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Chip
                label="No"
                color="success"
                variant={!selectedDeclaration.isResidentOutsideIndia ? '' : 'outlined'}
                style={{ cursor: 'pointer', borderRadius: '6px', width: '100%', paddingBlock: '18px', fontSize: '12px' }}
                onClick={(e) => handleDeclarationClick('ResidentOutsideIndia')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: 0.6 }}
            onClick={async () => {
              props.handleTabChange(event, props.tabValue - 1);
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ borderRadius: 0.6 }}
            onClick={async () => {
              props.handleTabChange(event, props.tabValue + 1);
            }}
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Declaration);

// const [selectedDeclaration, setSelectedDeclaration] = useState({
//   isPoliticallyExposed: true,
//   isRelativeToPoliticallyExposed: true,
//   isResidentOutsideIndia: false
// });
// const handleDeclarationClick = (value) => {
//   if (value === 'PoliticallyExposed') {
//     setSelectedDeclaration({ ...selected, isPoliticallyExposed: !selected.isPoliticallyExposed });
//   } else if (value === 'RelativeToPoliticallyExposed') {
//     setSelectedDeclaration({ ...selected, isRelativeToPoliticallyExposed: !selected.isRelativeToPoliticallyExposed });
//   } else if (value === 'ResidentOutsideIndia') {
//     setSelectedDeclaration({ ...selected, isResidentOutsideIndia: !selected.isResidentOutsideIndia });
//   }
// };
