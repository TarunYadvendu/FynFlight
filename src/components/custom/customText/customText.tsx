import { useTheme } from '@/theme/themeProvider/paperTheme';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

export enum TextVariants {
  displayLarge = 'displayLarge',
  displayMedium = 'displayMedium',
  displaySmall = 'displaySmall',

  headlineLarge = 'headlineLarge',
  headlineMedium = 'headlineMedium',
  headlineSmall = 'headlineSmall',

  titleLarge = 'titleLarge',
  titleMedium = 'titleMedium',
  titleSmall = 'titleSmall',

  labelLarge = 'labelLarge',
  labelMedium = 'labelMedium',
  labelSmall = 'labelSmall',

  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
}

export enum TextEllipsis {
  head = 'head',
  middle = 'middle',
  tail = 'tail',
  clip = 'clip',
}

// options for component
type Props = {
  children: React.ReactNode;
  variant?: TextVariants;
  color?: ColorValue;
  maxLines?: number;
  ellipsis?: TextEllipsis;
  selectable?: boolean;
  allowFontScaling?: boolean;
  allowAdjustsFontSizeToFit?: boolean;
  maxFontSizeMultiplier?: number;
  style?: StyleProp<TextStyle>;
  // onPress is supported on native Text and is required for inline clickable
  // text inside a paragraph (e.g. a link embedded within body copy where a
  // separate Tap wrapper would break the flow of text and wrapping).
  onPress?: () => void;
  defaultScaling?: boolean; //to let the text have 1.3 scaling only
};

export const DEFAULTMAXFONTSIZE = 1.3; //for particular text, those which cant break

function CustomText({
  variant = TextVariants.bodyMedium,
  allowFontScaling = true,
  allowAdjustsFontSizeToFit = false,
  defaultScaling = false,
  ...props
}: Props) {
  const theme = useTheme(); //theme

  return (
    <Text
      adjustsFontSizeToFit={allowAdjustsFontSizeToFit}
      variant={variant}
      allowFontScaling={allowFontScaling}
      style={[
        {
          color: props.color ? props.color : theme.colors.onSurface,
        },
        props.style,
      ]}
      selectable={props.selectable}
      numberOfLines={props.maxLines}
      ellipsizeMode={props.ellipsis}
      maxFontSizeMultiplier={
        defaultScaling ? DEFAULTMAXFONTSIZE : props.maxFontSizeMultiplier
      }
      onPress={props.onPress}
    >
      {props.children}
    </Text>
  );
}

export default CustomText;
