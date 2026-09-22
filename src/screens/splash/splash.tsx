import { CustomImage } from '@/components/custom';
import { ResizeModeType } from '@/components/custom/customImage/customImage';
import { Images } from '@/theme/assets/images';
import { useTheme } from '@/theme/themeProvider/paperTheme';
import { useAppNavigation } from '@/utils/navigation/navigationUtils';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

/** Added by @Yuvraj 21-09-2026 -> how long the splash stays before handing over to the dashboard */
const SPLASH_DURATION = 1500;

const Splash = () => {
  /** Added by @Yuvraj 21-06-2026 -> to access app theme(colors, roundness, fonts, etc) */
  const theme = useTheme();

  /** Added by @Yuvraj 21-06-2026 -> access StylesSheet with theme implemented */
  const styles = makeStyles();

  //redirect to dashboard
  const navigation = useAppNavigation();

  /** Added by @Yuvraj 21-09-2026 -> splash slides up while the dashboard slides in from the bottom */
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigation.replace('Dashboard');
    }, SPLASH_DURATION);
    return () => clearTimeout(redirectTimeout);
  });

  return (
    <Animated.View style={[styles.flex, animatedStyle]}>
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
    </Animated.View>
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
