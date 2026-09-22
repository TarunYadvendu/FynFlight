import { GlassView } from '@/components/common';
import {
  CustomImage,
  CustomText,
  CustomTextInput,
  Tap,
} from '@/components/custom';
import { Images } from '@/theme/assets/images';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { useAppNavigation } from '@/utils/navigation/navigationUtils';
import { DrawerActions } from '@react-navigation/native';
import { useRef } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type HeaderProps = {
  title: string;
  search?: string;
  setSearch?: (search: string) => void;
};

const Header = ({ ...props }: HeaderProps) => {
  /** to get the default theme of app */
  const theme = useTheme();

  /** theme integration in styles */
  const styles = makeStyle(theme);

  //naviagtion
  const navigation = useAppNavigation();

  const searchInputRef = useRef<any>(null);

  //shared value for diff speed animation
  const normalProgress = useSharedValue(1);
  const editorProgress = useSharedValue(0);

  //animatiopn trigger
  const toggleToolbar = () => {
    if (normalProgress.value === 1) {
      normalProgress.value = withTiming(0, {
        duration: 100,
      });
      editorProgress.value = withTiming(1, {
        duration: 350,
      });
      // Focus after the search input becomes visible
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 250);
    } else {
      editorProgress.value = withTiming(0, {
        duration: 100,
      });
      normalProgress.value = withTiming(1, {
        duration: 350,
      });
      props.setSearch && props.setSearch('');
      searchInputRef.current?.blur();
    }
  };

  //animatiopn effect for editor
  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(editorProgress.value, [0, 1], [40, 0]),
        },
      ],
      opacity: interpolate(editorProgress.value, [0, 1], [0, 1]),
    };
  });

  //animatiopn effect for normal
  const normalHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(normalProgress.value, [0, 1], [-40, 0]),
        },
      ],
      opacity: interpolate(normalProgress.value, [0, 1], [0, 1]),
    };
  });

  return (
    <GlassView style={styles.container}>
      <View style={styles.subContainer}>
        <Animated.View style={[styles.mainContent, normalHeaderStyle]}>
          <Tap
            onPress={() => {
              Keyboard.dismiss();
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <CustomImage source={Images.drawer} style={styles.drawer} />
          </Tap>

          <CustomText>{props.title}</CustomText>

          <Tap onPress={toggleToolbar}>
            <CustomImage source={Images.search} style={styles.drawer} />
          </Tap>
        </Animated.View>

        <Animated.View style={[styles.textInputContent, searchAnimatedStyle]}>
          <CustomTextInput
            ref={searchInputRef}
            style={styles.flex}
            onChangeText={props.setSearch}
            value={props.search}
            suffixIcon={{
              source: Images.close,
              tap: toggleToolbar,
            }}
          />
        </Animated.View>
      </View>
    </GlassView>
  );
};

const makeStyle = (theme: CustomTheme) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    drawer: {
      width: 20,
      height: 20,
    },
    close: {
      width: 30,
      height: 30,
    },
    container: {
      position: 'absolute',
      justifyContent: 'center',
      left: 0,
      right: 0,
      top: 0,
      borderRadius: theme.roundness,
      padding: 5,
      margin: 10,
      zIndex: 10,
    },
    subContainer: {
      paddingVertical: 22,
    },
    mainContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      inset: 8,
    },
    textInputContent: {
      position: 'absolute',
      right: 1,
      left: 1,
      top: 2,
    },
  });

export default Header;
