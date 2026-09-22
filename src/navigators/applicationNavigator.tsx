import { useTheme } from '@/theme/themeProvider/paperTheme';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { PaperProvider } from 'react-native-paper';
import RootStack from './routes';

export const ApplicationNavigator = () => {
  /* pass this appTheme to PaperProvider and NavigationContainer to set global theme START */

  const appTheme = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={appTheme}>
        <RootStack />
        <FlashMessage position="bottom" style={{ marginBottom: 64 }} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ApplicationNavigator;
