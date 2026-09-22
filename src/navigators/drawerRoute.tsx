import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppDrawer } from './appDrawer';
import { DrawerStackParamList } from './types';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

function MyDrawer() {
  const appDrawerContent = (props: any) => {
    return <AppDrawer {...props} />;
  };

  return <AppDrawer />;
}
