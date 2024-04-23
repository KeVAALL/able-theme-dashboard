import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField, { CustomAutoComplete, CustomCheckbox } from 'utils/textfield';

// assets
import { GetInvestorData, GetOneInvestor, SaveInvestor, EditInvestor, DeleteOneInvestor } from 'hooks/investor/investor';

function Investor() {
  // Main data
  const [investorData, setInvestorData] = useState([]);

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [isInvestorActive, setInvestorActive] = useState();
  const setEditing = (value) => {
    setFormValues(value);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const handleIsInvestorActive = (initialValue) => {
    setInvestorActive(initialValue);
  };

  // Search one item state
  const setSearchData = (investor) => {
    setInvestorData(investor);
  };
  // Search one item form fields
  const filterFormValues = {
    search: ''
  };
  const formValueFields = [
    {
      fieldName: 'search',
      label: 'Global Search',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    search: yup.string()
  });

  // Add form values
  // const formAllValues = {
  //   fd_name: '',
  //   fd_max_amount: '',
  //   fd_min_amount: '',
  //   min_tenure: '',
  //   max_tenure: '',
  //   logo_url: ''
  // };
  const formAllValues = {
    investor_name: '',
    pan_no: '',
    mobile_no: '',
    investor_type: ''
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    investor_name: yup.string().required('Investor Name is required'),
    pan_no: yup.string().required('Pan number is required'),
    mobile_no: yup.number().required('Mobile number is required'),
    investor_type: yup.string().required('Investor type is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Custom fields/ columns
  const theme = useTheme();
  const ImageCell = ({ value }) => {
    return (
      <TableCell style={{ paddingLeft: '0px' }}>
        <img src={value} alt="Custom" style={{ width: '90%', height: 60 }} />
      </TableCell>
    );
  };
  const StatusCell = ({ value }) => {
    return value === 0 ? 'Not Active' : 'Active';
  };
  const columns = useMemo(
    () => [
      {
        Header: 'investor Name',
        accessor: 'investor_name'
      },
      {
        Header: 'Pan Number',
        accessor: 'pan_no'
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile_no'
      },
      {
        Header: 'Type',
        accessor: 'investor_type'
      },
      {
        Header: 'Status',
        accessor: 'is_active',
        customCell: StatusCell
      }
    ],
    []
  );

  const {
    isPending,
    error,
    refetch: InvestorTableDataRefetch
  } = useQuery({
    queryKey: ['investorTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetInvestorData,
    onSuccess: (data) => {
      setInvestorData(data);
    }
  });

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              SaveProduct(values, InvestorTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative);
            }
            if (isEditing === true) {
              console.log('i am editing');

              console.log({ ...values, method_name: 'update' });
              EditInvestor(
                values,
                // isFDActive,
                isInvestorActive,
                InvestorTableDataRefetch,
                clearFormValues,
                setActiveClose
              );
            }

            changeTableVisibility();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting }) => (
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
                <SubmitButton
                  title="Investor Entry"
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsInvestorActive}
                  isActive={isInvestorActive}
                />

                <Divider />
                {/* const formAllValues = {
    investor_name: '',
    pan_no: '',
    mobile_no: '',
    investor_type: ''
  }; */}
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Investor Name"
                        name="investor_name"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Pan Number"
                        name="pan_no"
                        values={values}
                        type="string"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Mobile NUmber"
                        name="mobile_no"
                        values={values}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Investor type"
                        name="investor_type"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                      {/* <CustomAutoComplete
                        options={[
                          { name: 'Male', id: 1 },
                          { name: 'Female', id: 2 },
                          { name: 'Senior Citizen', id: 3 }
                        ]}
                        value={values.investor_type} // Ensure this is correctly linked to your Formik form's state
                        handleChange={(selectedOption) => {
                          handleChange('investor_type')(selectedOption.name);
                        }}
                        optionName="investor_name"
                        label="Investor Type"
                      /> */}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {!showTable && (
        <MainCard
          title="Investor"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <MultiTable
            columns={columns}
            data={investorData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneInvestor}
            deleteOneItem={DeleteOneInvestor}
            setSearchData={setSearchData}
            tableDataRefetch={InvestorTableDataRefetch}
            setActiveEditing={setActiveEditing}
          />
        </MainCard>
      )}
    </>
  );
}

export default Investor;
