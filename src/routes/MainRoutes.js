import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AppCustomerList = Loadable(lazy(() => import('pages/apps/customer/list')));
const AppCustomerCard = Loadable(lazy(() => import('pages/apps/customer/card')));

const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));

// Product
const Product = Loadable(lazy(() => import('pages/product/product')));
const FixedDeposit= Loadable(lazy(() => import('pages/fixed_deposit/fixedDeposit')));
const FormsBasic = Loadable(lazy(() => import('pages/form-basic/basic-form')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/auth1/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth1/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth1/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth1/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth1/code-verification')));

const AuthLogin2 = Loadable(lazy(() => import('pages/auth/auth2/login2')));
const AuthRegister2 = Loadable(lazy(() => import('pages/auth/auth2/register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('pages/auth/auth2/forgot-password2')));
const AuthResetPassword2 = Loadable(lazy(() => import('pages/auth/auth2/reset-password2')));
const AuthCheckMail2 = Loadable(lazy(() => import('pages/auth/auth2/check-mail2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('pages/auth/auth2/code-verification2')));

const AuthLogin3 = Loadable(lazy(() => import('pages/auth/auth3/login3')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceUnderConstruction2 = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction2')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon2')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dash_board',
          element: <></>
        },
        {
          path: 'investor',
          children: [
            {
              path: 'investor_list',
              element: <></>
            },
            {
              path: 'add_new_investor',
              element: <></>
            },
            {
              path: 'transaction_list',
              element: <></>
            }
          ]
        },
        {
          path: 'product',
          children: [
            {
              path: 'add_product',
              element: <Product />
            },
            {
              path: 'fixed_deposit',
              element: <FixedDeposit/>
            }
          ]
        },
        {
          path: 'form',
          children: [
            {
              path: 'basic',
              element: <FormsBasic />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
