import { CustomImage } from '@/components/custom';
import { ResizeModeType } from '@/components/custom/customImage/customImage';
import { Images } from '@/theme/assets/images';
import { useAppNavigation } from '@/utils/navigation/navigationUtils';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  /** Added by @Yuvraj 21-06-2026 -> to access app theme(colors, roundness, fonts, etc) */
  //   const theme = useTheme();

  /** Added by @Yuvraj 21-06-2026 -> access StylesSheet with theme implemented */
  const styles = makeStyles();

  //redirect to dashboard
  const navigation = useAppNavigation();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigation.replace('Dashboard');
    }, 1500);

    //     navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // });

    return () => clearTimeout(redirectTimeout);
  });

  return (
    <View style={styles.flex}>
      <CustomImage
        source={Images.appBanner}
        style={styles.image}
        resizeMode={ResizeModeType.cover}
      />
      <View style={styles.container}>
        <CustomImage
          source={Images.splashLoading}
          style={styles.splashLoadingGif}
          //   resizeMode={ResizeModeType.contain}
        />
      </View>
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 100,
    },
    image: {
      width: width, // Adjust the size as needed
      height: height, // Adjust the size as needed
      position: 'absolute',
      inset: 0,
    },
    splashLoadingGif: {
      width: 150,
      height: 150,
      alignSelf: 'center',
    },
  });

export default Splash;
