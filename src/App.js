import { useEffect, useState } from 'react';

// project-imports
import Routes from 'routes';
import ThemeCustomization from 'themes';
import { ToastContainer } from 'react-toastify';

import Loader from 'components/Loader';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeCustomization>
      <RTLLayout>
        <ScrollTop>
          <AuthProvider>
            <>
              <Notistack>
                <ToastContainer />
                <Routes />
                <Snackbar />
              </Notistack>
            </>
          </AuthProvider>
        </ScrollTop>
      </RTLLayout>
    </ThemeCustomization>
  );
};

export default App;
