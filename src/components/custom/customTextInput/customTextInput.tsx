import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { ImageStyle } from '@d11/react-native-fast-image';
import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomImage from '../customImage/customImage';
import { Tap } from '../tap/tap';

type InputIcon = {
  source: any;
  color?: string;
  style?: StyleProp<ImageStyle>;
  tap?: () => void;
};

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;

  prefixIcon?: InputIcon;
  suffixIcon?: InputIcon;

  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;

  height?: number;
  fillColor?: string;
  borderRadius?: number;
};

const CustomTextInput = forwardRef<RNTextInput, Props>(
  (
    {
      value,
      onChangeText,
      placeholder,
      prefixIcon,
      suffixIcon,
      style,
      contentStyle,
      outlineStyle,
      height = 40,
      fillColor,
      borderRadius,
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = makeStyles(
      theme,
      height,
      fillColor,
      borderRadius,
      !!prefixIcon,
      !!suffixIcon,
    );

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={ref as any}
          mode="outlined"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          contentStyle={[styles.content, contentStyle]}
          outlineStyle={[styles.outline, outlineStyle]}
          theme={{
            colors: {
              onSurfaceVariant: theme.colors.labelLight,
            },
          }}
        />
        {prefixIcon && (
          <Tap onPress={prefixIcon.tap} containerStyle={styles.prefixIcon}>
            <CustomImage
              source={prefixIcon.source}
              color={prefixIcon.color ?? theme.colors.onSurface}
              style={styles.prefixIconImage}
            />
          </Tap>
        )}

        {suffixIcon && (
          <Tap onPress={suffixIcon.tap} containerStyle={styles.suffixIcon}>
            <CustomImage
              source={suffixIcon.source}
              color={suffixIcon.color ?? theme.colors.onSurface}
              style={styles.suffixIconImage}
            />
          </Tap>
        )}
      </View>
    );
  },
);

CustomTextInput.displayName = 'CustomTextInput';

const makeStyles = (
  theme: CustomTheme,
  height: number,
  fillColor?: string,
  borderRadius?: number,
  hasPrefix?: boolean,
  hasSuffix?: boolean,
) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },

    input: {
      height,
      backgroundColor: fillColor ?? theme.colors.background,
    },

    content: {
      paddingLeft: hasPrefix ? 35 : 10,
      paddingRight: hasSuffix ? 35 : 10,
    },

    outline: {
      borderRadius: borderRadius ?? theme.roundness,
    },

    prefixIcon: {
      position: 'absolute',
      left: 10,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 1,
    },

    suffixIcon: {
      position: 'absolute',
      right: 10,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 1,
    },

    prefixIconImage: {
      width: 20,
      height: 20,
    },

    suffixIconImage: {
      width: 20,
      height: 20,
    },
  });

export default CustomTextInput;
