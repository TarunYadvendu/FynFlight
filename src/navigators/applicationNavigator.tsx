import { useTheme } from '@/theme/themeProvider/paperTheme';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootStack from './routes';

export const ApplicationNavigator = () => {
  /* pass this appTheme to PaperProvider and NavigationContainer to set global theme START */

  const appTheme = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ApplicationNavigator;
