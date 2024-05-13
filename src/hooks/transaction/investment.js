// third-party
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

export async function GetStatusDropdown() {
  try {
    const response = await axios.post('transaction/get_status', {
      method_name: 'getstatus'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function GetInvestmentData(values) {
  try {
    const response = await axios.post('transaction/get_investments', {
      ...values,
      method_name: 'getinvestments'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function GetMaturityAction() {
  try {
    const response = await axios.post('transaction/get_fdschemes', {
      method_name: 'getmaturityactions'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function GetScheme(values) {
  try {
    const response = await axios.post('transaction/get_fdschemes', {
      ...values,
      method_name: 'getfdscheme'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function CalculateFD(values) {
  try {
    const response = await axios.post('product/calculatefd', {
      ...values
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
