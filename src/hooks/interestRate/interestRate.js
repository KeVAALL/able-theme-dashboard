// third-party
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

// assets
import { dispatch } from '../../redux';
import { openSnackbar } from 'redux/reducers/snackbar';

const toInteger = (boolValue) => {
  return boolValue ? 1 : 0;
};

export async function GetInterestRateData() {
  try {
    const response = await axios.post('investor/getinvestor', {
      method_name: 'getall'
    });
    console.log(response);
    return response.data.data;
  } catch (err) {
    return err;
  }
}
export async function GetOneInterestRate(values, setSearchData) {
  try {
    const response = await axios.post('investor/getinvestor', {
      method_name: 'getone',
      ...values
    });
    setSearchData(response.data.data);
  } catch (error) {
    dispatch(
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        message: error.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      })
    );
  }
}
export async function SaveInterestRate(
  values,
  ProductTableDataRefetch,
  clearFormValues,
  checkedCumulative,
  checkedNonCumulative,
  selectedIssuerID
) {
  console.log({
    ...values,
    issuer_id: selectedIssuerID,
    is_cumulative: toInteger(!checkedCumulative ? false : checkedCumulative),
    is_non_cumulative: toInteger(!checkedNonCumulative ? false : checkedNonCumulative),
    user_id: 2,
    method_name: 'add'
  });
  try {
    await axios.post('/product/saveproduct', {
      ...values,
      issuer_id: selectedIssuerID,
      is_cumulative: toInteger(!checkedCumulative ? false : checkedCumulative),
      is_non_cumulative: toInteger(!checkedNonCumulative ? false : checkedNonCumulative),
      user_id: 2,
      method_name: 'add'
    });
    clearFormValues();
    enqueueSnackbar('Product added', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    ProductTableDataRefetch();
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }
}
export async function EditInterestRate(
  values,
  isFDActive,
  ProductTableDataRefetch,
  clearFormValues,
  checkedCumulative,
  checkedNonCumulative,
  setActiveClose
) {
  try {
    await axios.post('/product/saveproduct', {
      ...values,
      is_active: toInteger(isFDActive),
      method_name: 'update',
      is_cumulative: toInteger(!checkedCumulative ? false : checkedCumulative),
      is_non_cumulative: toInteger(!checkedNonCumulative ? false : checkedNonCumulative),
      user_id: 2
    });
    clearFormValues();
    setActiveClose();
    enqueueSnackbar('Product Updated', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    ProductTableDataRefetch();
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }
}
export async function DeleteOneInterestRate(values) {
  try {
    console.log(values.osb_issuer_id);
    await axios.post('/product/saveproduct', {
      fd_id: values.fd_id,
      method_name: 'delete'
    });
    enqueueSnackbar('Product Deleted', {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  } catch (err) {
    console.log(err);
  }
}
