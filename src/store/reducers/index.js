// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project-imports
import chat from './chat';
import calendar from './calendar';
// import menuReducer from './menu';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import invoice from './invoice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  // cart: cartReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'able-pro-material-ts-'
    },
    cartReducer
  ),
  // menu: persistReducer(
  //   {
  //     key: 'menu',
  //     storage,
  //     keyPrefix: 'able-pro-material-ts-'
  //   },
  //   menuReducer
  // ),
  product: productReducer,
  kanban,
  invoice
});

export default reducers;
