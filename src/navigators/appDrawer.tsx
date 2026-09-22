import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { StyleSheet, View } from 'react-native';

export const AppDrawer = () => {
  /** to get the default theme of app */
  const theme = useTheme();

  /** theme integration in styles */
  const styles = makeStyle(theme);

  return <View style={styles.main}></View>;
};

const makeStyle = (theme: CustomTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
  });
