// third-party
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

// assets
import { dispatch } from '../../redux';
import { openSnackbar } from 'redux/reducers/snackbar';
import { toInteger } from 'lodash';

export async function GetIssuerData() {
  try {
    const response = await axios.post('/issuer/getissuer', {
      method_name: 'getall'
    });
    console.log(response);
    return response.data.data;
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
    return [];
  }
}
export async function GetActiveIssuerData() {
  try {
    const response = await axios.post('/issuer/getissuer', {
      method_name: 'getall_isactive'
    });
    console.log(response);
    return response.data.data;
  } catch (err) {
    return err;
  }
}
export async function GetOneIssuer(values, setSearchData) {
  try {
    const response = await axios.post('/issuer/getissuer', {
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
export async function SaveIssuer(values, issuerTableDataRefetch, clearFormValues) {
  try {
    const response = await axios.post('/issuer/saveissuer', {
      ...values,
      method_name: 'add',
      max_dp_fd_limit: 0,
      max_fd_nominee_limit: 0,
      max_pms_nominee_limit: 0,
      renewable_lower_bound: 0,
      renewable_upper_bound: 0,
      is_renewable: 0,
      user_id: 2
    });
    console.log(response);
    clearFormValues();
    enqueueSnackbar('Issuer added', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    issuerTableDataRefetch();
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
export async function EditIssuer(values, isIssuerActive, issuerTableDataRefetch, clearFormValues, setActiveClose) {
  //   console.log({ ...values, is_active: toInteger(isIssuerActive), method_name: 'update', user_id: 2 });
  try {
    const response = await axios.post('/issuer/saveissuer', {
      ...values,
      is_active: toInteger(isIssuerActive),
      method_name: 'update',
      user_id: 2
    });
    if (response.status === 409) {
      throw response;
    }
    clearFormValues();
    setActiveClose();
    enqueueSnackbar('Issuer Updated', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    issuerTableDataRefetch();
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
export async function DeleteOneIssuer(values) {
  try {
    await axios.post('/issuer/saveissuer', {
      issuer_id: values.issuer_id,
      user_id: 2,
      method_name: 'delete'
    });
    enqueueSnackbar('Issuer Deleted', {
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