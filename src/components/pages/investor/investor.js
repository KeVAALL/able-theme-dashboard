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
    investor_name: ''
  };
  const formValueFields = [
    {
      fieldName: 'investor_name',
      label: 'Investor Name',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    investor_name: yup.string().required('Name is required')
  });

  // Add form values
  const formAllValues = {
    fd_name: '',
    fd_max_amount: '',
    fd_min_amount: '',
    min_tenure: '',
    max_tenure: '',
    logo_url: ''
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    fd_max_amount: yup.number().required('Mini Amount is required'),
    fd_min_amount: yup.number().required('Max Amount is required'),
    min_tenure: yup.number().required('Minimum Tenure is required'),
    max_tenure: yup.number().required('Max Tenure is required'),
    logo_url: yup.string().required('Logo URL is required')
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
        Header: 'Email ID',
        accessor: 'email_id'
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
              SaveProduct(values, ProductTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative);
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              EditProduct(
                values,
                isFDActive,
                ProductTableDataRefetch,
                clearFormValues,
                checkedCumulative,
                checkedNonCumulative,
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

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="FD Name"
                        name="fd_name"
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
                        label="Max Amount"
                        name="fd_max_amount"
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
                        label="Min Amount"
                        name="fd_min_amount"
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
                        label="Minimum Tenure"
                        name="min_tenure"
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
                        label="Max Tenure"
                        name="max_tenure"
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
                        label="Logo URL"
                        name="logo_url"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
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
