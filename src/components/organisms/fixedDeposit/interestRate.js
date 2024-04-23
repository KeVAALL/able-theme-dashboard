import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Divider, Box, Card, Grid, CardContent, Button, Stack, CardHeader, FormControlLabel, Switch } from '@mui/material';
import AnimateButton from 'helpers/@extended/AnimateButton';
import { ReceiptSearch } from 'iconsax-react';
import PropTypes from 'prop-types';
// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/loader/Loader';
import CustomTextField, { CustomAutoComplete } from 'utils/textfield';
import MultiTable from '../../pages/multiTable/multiTable';
// assets
import {
  GetInterestRateData,
  GetOneInterestRate,
  SaveInterestRate,
  EditInterestRate,
  DeleteOneInterestRate,
  GetPayoutMethod,
  GetSchemeSearch
} from 'hooks/interestRate/interestRate';
import { DialogForm } from 'components/atoms/dialog/formdialog';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

export default function InterestRate({ formValues, changeTableVisibility, isNotEditingInterestRate }) {
  useEffect(() => {
    console.log(formValues);
    setEditing(formValues);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [formValues]);

  // Autocomplete field state
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState(null);
  const [payoutData, setPayoutData] = useState([]);
  const { isPending, error, refetch } = useQuery({
    queryKey: ['payoutData', formValues.fd_id],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: () => GetPayoutMethod(formValues.fd_id),
    onSuccess: (data) => {
      console.log(data);
      setPayoutData(data);
    }
  });
  const handleOnIssuerChange = (event) => {
    payoutData.map((el) => {
      if (el.item_value === event.target.outerText) {
        console.log(el.item_id);
        setSelectedPayoutMethod(el.item_id);
      }
    });
  };
  // Search one item state
  const setSearchData = (interestRate) => {
    setIssuerData(interestRate);
  };
  const [showActionHeadButton, setShowActionHeadButton] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  // Add form Values
  const formAllValues = {
    fd_name: '',
    issuer_name: ''
  };
  const [IRformValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    issuer_name: yup.string().required('Issuer Name is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Edit Logic State
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const setEditing = (value) => {
    console.log(value);
    setFormValues({
      fd_name: value.fd_name,
      issuer_name: value.issuer_name
    });
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  // Custom fields/ columns
  const theme = useTheme();
  const columns = useMemo(
    () => [
      {
        Header: 'Tenure',
        accessor: 'tenure'
      },
      {
        Header: 'Normal Citizen',
        accessor: 'normal_citizen'
      },
      {
        Header: 'Senior Citizen',
        accessor: 'senior_citizen'
      },
      {
        Header: 'Female Citizen',
        accessor: 'female_citizen'
      },
      {
        Header: 'Senior Female Citizen',
        accessor: 'senior_female_citizen'
      }
    ],
    []
  );
  const interestData = [
    // {
    //   tenure: '51-59',
    //   normal_citizen: 'Akshyad',
    //   senior_citizen: '5%',
    //   female_citizen: '6%',
    //   senior_female_citizen: '10%'
    // }
  ];

  if (loading) return <Loader />;

  return (
    <Stack spacing={2}>
      <DialogForm
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        fdId={formValues.fd_id}
        selectedPayoutMethod={selectedPayoutMethod}
        clearFormValues={clearFormValues}
        SaveInterestRate={SaveInterestRate}
      />
      <Formik
        initialValues={IRformValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          GetSchemeSearch(formValues.fd_id, selectedPayoutMethod);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            sx={{ width: '100%' }}
          >
            <Card
              sx={{
                position: 'relative',
                border: '1px solid',
                borderRadius: 1.5,
                borderColor: theme.palette.divider,
                overflow: 'visible'
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title="Interest Rate" />
                <Stack direction="row" alignItems="center" spacing={1.5} paddingRight={2.5}>
                  {isEditing ? (
                    <Box>
                      <FormControlLabel
                        value="start"
                        control={
                          <Switch
                            color="primary"
                            checked={isActive}
                            onChange={() => {
                              setIsActive(!isActive);
                            }}
                          />
                        }
                        // control={<Switch color="primary" checked={isActive} onChange={setIsActive} />}
                        label="Active"
                        labelPlacement="start"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Box>
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="button"
                        onClick={() => {
                          isNotEditingInterestRate();
                        }}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                  </Box>
                </Stack>
              </Stack>

              <Divider />

              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <CustomTextField
                      label="FD Name"
                      name="fd_name"
                      values={values}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      label="Issuer Name"
                      name="issuer_name"
                      values={values}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      disabled
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomAutoComplete
                      options={payoutData}
                      handleChange={handleOnIssuerChange}
                      optionName="item_value"
                      label="Payout Method"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <AnimateButton>
                        <Button fullWidth variant="contained" color="success" startIcon={<ReceiptSearch />} type="submit">
                          Show
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <MultiTable
                      columns={columns}
                      data={interestData}
                      changeTableVisibility={changeTableVisibility}
                      setEditing={setEditing}
                      getOneItem={GetOneInterestRate}
                      deleteOneItem={DeleteOneInterestRate}
                      setSearchData={setSearchData}
                      //   tableDataRefetch={issuerTableDataRefetch}
                      setActiveEditing={setActiveEditing}
                      showActionHeadButton={showActionHeadButton}
                      handleIROpenDialog={handleOpenDialog}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </Formik>
    </Stack>
  );
}

InterestRate.propTypes = {
  formValues: PropTypes.array,
  setActiveClose: PropTypes.any,
  changeTableVisibility: PropTypes.any,
  isNotEditingInterestRate: PropTypes.any
};
