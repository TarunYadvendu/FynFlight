import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { showSnackbar } from '@/utils/utils';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import { DrawerRoute } from './drawerRoute';

export const ApplicationNavigator = () => {
  /* pass this appTheme to PaperProvider and NavigationContainer to set global theme START */

  const appTheme = useTheme();

  /** theme integration in styles */
  const styles = makeStyle(appTheme);

  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
      showSnackbar('No internet connection', 'danger', 1000 * 60 * 60); // stays until back online
    } else if (wasOffline.current) {
      wasOffline.current = false;
      showSnackbar('Back online', 'success');
    }
  }, [isOnline]);

  return (
    <PaperProvider theme={appTheme}>
      {/* <NavigationContainer theme={appTheme}> */}
      <DrawerRoute />
      <FlashMessage position="bottom" style={styles.flash} />
      {/* </NavigationContainer> */}
    </PaperProvider>
  );
};

const makeStyle = (theme: CustomTheme) =>
  StyleSheet.create({
    flash: { marginBottom: 64 },
    main: {
      backgroundColor: theme.colors.transparent,
    },
  });

export default ApplicationNavigator;
