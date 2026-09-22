import {
  createDrawerNavigator,
  createDrawerScreen,
} from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import { AppDrawer } from './appDrawer';
import RootStack from './routes';

const MyDrawer = createDrawerNavigator({
  drawerContent: () => <AppDrawer />,
  screens: {
    Home: createDrawerScreen({
      screen: RootStack,
      options: {
        headerShown: false,
      },
    }),
  },
});

export const DrawerRoute = createStaticNavigation(MyDrawer);
