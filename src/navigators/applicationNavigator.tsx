import { useTheme } from '@/theme/themeProvider/paperTheme';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import { DrawerRoute } from './drawerRoute';

export const ApplicationNavigator = () => {
  /* pass this appTheme to PaperProvider and NavigationContainer to set global theme START */

  const appTheme = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      {/* <NavigationContainer theme={appTheme}> */}
      <DrawerRoute />
      <FlashMessage position="bottom" style={{ marginBottom: 64 }} />
      {/* </NavigationContainer> */}
    </PaperProvider>
  );
};

export default ApplicationNavigator;
