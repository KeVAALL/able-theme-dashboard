import { useRoutes } from 'react-router-dom';

// project-imports
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ComponentsRoutes from './ComponentsRoutes';

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, MainRoutes, ComponentsRoutes]);
}
