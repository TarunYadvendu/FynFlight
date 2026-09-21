import { CustomImage } from '@/components/custom';
import { ResizeModeType } from '@/components/custom/customImage/customImage';
import { Images } from '@/theme/assets/images';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { useAppNavigation } from '@/utils/navigation/navigationUtils';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';

const { height } = Dimensions.get('window');

export const Dashboard = () => {
  /** Added by @Yuvraj 21-06-2026 -> to access app theme(colors, roundness, fonts, etc) */
  const theme = useTheme();

  /** Added by @Yuvraj 21-06-2026 -> access StylesSheet with theme implemented */
  const styles = makeStyles(theme);

  //redirect to dashboard
  const navigation = useAppNavigation();

  return (
    <ScrollView style={styles.flex}>
      <CustomImage
        source={Images.appBanner}
        style={styles.image}
        resizeMode={ResizeModeType.cover}
      />
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
      <Text>{'there is something'}</Text>
    </ScrollView>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    image: {
      // position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: height / 2,
      borderBottomLeftRadius: theme.roundness,
      borderBottomRightRadius: 200,
    },
  });

export default Dashboard;
