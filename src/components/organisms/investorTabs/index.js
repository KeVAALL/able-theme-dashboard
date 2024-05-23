/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Tab, Tabs, Divider } from '@mui/material';

// project-imports
import MainCard from 'components/molecules/mainCard';

// assets
import { Briefcase, LocationTick, UserOctagon, Personalcard, ProfileTick } from 'iconsax-react';
import PersonalInfo from './personalInfo';
import AddressDetails from './addressDetails';
import ProfessionalDetails from './professionalDetails';
import Nomination from './nomination';
import Declaration from './declaration';

// css
import './index.css';

// ==============================|| TAB PANEL ||============================== //

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| TABS - ICON ||============================== //

export default function IconTabs(props) {
  const [tabValue, setTabValue] = useState(0);

  const validateCurrentTab = () => {
    const { errors, dirty, touched } = props;
    switch (tabValue) {
      case 0:
        return true;
      case 1: {
        if (errors.investor_address || !dirty.valueOf('investor_address')) {
          props.setAddressDetailsError(true);
        } else {
          props.setAddressDetailsError(false);
        }
        // return (
        //   !errors.investor_address &&
        //   Object.keys(touched.investor_address || {}).length > 0 &&
        //   !errors.correspondent_address &&
        //   Object.keys(touched.correspondent_address || {}).length > 0
        // );
        return true;
      }
      case 2:
        return !errors.professional_details;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleChange = (event, newValue) => {
    if (validateCurrentTab()) {
      setTabValue(newValue);
    } else {
      // Optionally, you can display an error message or highlight the fields with errors
      console.log('Please fix the errors before proceeding');
    }
  };

  useEffect(() => {
    console.log(props.errors);
  }, [props.errors]);

  const tabStyle = { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderRadius: 1.5, overflow: 'visible' };

  return (
    <Box sx={{ width: '100%' }}>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          className={`tab_main ${props.addressDetailsError || props.personalInfoError ? 'indicator_main' : ''}`}
          // className={`tab_main`}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={tabValue}
          onChange={handleChange}
          aria-label="scrollable force tabs example"
        >
          <Tab
            className={props.personalInfoError ? 'tab_1' : ''}
            label="Personal Info"
            icon={<Personalcard />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          {/* <CustomTooltip title="Add" arrow color="#fff" bg="pink"> */}
          <Tab
            className={props.addressDetailsError ? 'tab_2' : ''}
            label="Address Details"
            icon={<LocationTick />}
            iconPosition="start"
            {...a11yProps(1)}
          />
          <Tab className="tab_3" label="Professional Details" icon={<Briefcase />} iconPosition="start" {...a11yProps(2)} />
          <Tab className="tab_4" label="Add Nomination" icon={<UserOctagon />} iconPosition="start" {...a11yProps(3)} />
          <Tab className="tab_5" label="Declaration" icon={<ProfileTick />} iconPosition="start" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel className="panel" value={tabValue} index={0}>
        <MainCard sx={tabStyle}>
          <PersonalInfo
            values={props.values}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            setFieldValue={props.setFieldValue}
            touched={props.touched}
            errors={props.errors}
          />
        </MainCard>
      </TabPanel>
      <TabPanel className={`panel`} value={tabValue} index={1}>
        <MainCard sx={tabStyle}>
          <AddressDetails
            values={props.values}
            handleChange={props.handleChange}
            setFieldValue={props.setFieldValue}
            handleBlur={props.handleBlur}
            touched={props.touched}
            errors={props.errors}
          />
        </MainCard>
      </TabPanel>
      <TabPanel className="panel" value={tabValue} index={2}>
        <MainCard sx={tabStyle}>
          <ProfessionalDetails values={props.values} setFieldValue={props.setFieldValue} />
        </MainCard>
      </TabPanel>
      <TabPanel className="panel" value={tabValue} index={3}>
        <MainCard sx={tabStyle}>
          <Nomination
            values={props.values}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            touched={props.touched}
            errors={props.errors}
            setFieldValue={props.setFieldValue}
            nomineeData={props.nomineeData}
            handleNewNominee={props.handleNewNominee}
          />
        </MainCard>
      </TabPanel>
      <TabPanel className="panel" value={tabValue} index={4}>
        <MainCard sx={tabStyle}>
          <Declaration selectedDeclaration={props.selectedDeclaration} handleDeclarationClick={props.handleDeclarationClick} />
        </MainCard>
      </TabPanel>
    </Box>
  );
}
