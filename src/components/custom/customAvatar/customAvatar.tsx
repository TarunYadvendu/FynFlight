import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
// imported from the files directly, going through the barrel would be circular
import CustomImage, {
  ImageType,
  ResizeModeType,
} from '../customImage/customImage';
import CustomText from '../customText/customText';
import { Tap } from '../tap/tap';

export enum AvatarSize {
  small = 32,
  medium = 40,
  large = 56,
  xLarge = 80,
}

export enum AvatarShape {
  circle = 'circle',
  rounded = 'rounded',
  square = 'square',
}

export enum AvatarStatus {
  available = 'available',
  busy = 'busy',
  offline = 'offline',
}

// options for component
type Props = {
  source?: any; // require() for local images or { uri } for remote ones
  name?: string; // falls back to initials when there is no source
  size?: AvatarSize | number;
  shape?: AvatarShape;
  type?: ImageType;
  status?: AvatarStatus;
  backgroundColor?: string; // defaults to the theme primary container
  color?: string; // initials color
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

/** Added by @Yuvraj 21-09-2026 -> "Yuvraj Singh" -> "YS", "fynFlight" -> "F" */
const getInitials = (name?: string) => {
  if (!name) return '';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();
};

function CustomAvatar({
  size = AvatarSize.medium,
  shape = AvatarShape.circle,
  type = ImageType.png,
  bordered = false,
  ...props
}: Props) {
  const theme = useTheme(); // theme

  const styles = makeStyles(theme, size, shape); // access StylesSheet with theme implemented

  const initials = getInitials(props.name);

  const content = (
    <View
      style={[
        styles.container,
        { backgroundColor: props.backgroundColor ?? theme.colors.primary },
        bordered && styles.border,
        props.style,
      ]}
    >
      {props.source ? (
        <CustomImage
          source={props.source}
          type={type}
          style={styles.image}
          resizeMode={ResizeModeType.cover}
        />
      ) : (
        <CustomText
          style={styles.initials}
          color={props.color ?? theme.colors.onPrimary}
          maxLines={1}
          allowFontScaling={false}
        >
          {initials}
        </CustomText>
      )}

      {/* the ring keeps the dot readable against a busy photo */}
      {!!props.status && (
        <View style={[styles.status, styles[props.status]]} />
      )}
    </View>
  );

  if (!props.onPress) return content;

  return <Tap onPress={props.onPress}>{content}</Tap>;
}

const makeStyles = (theme: CustomTheme, size: number, shape: AvatarShape) => {
  /** Added by @Yuvraj 21-09-2026 -> dot and initials scale with the avatar so every size stays balanced */
  const statusSize = Math.round(size * 0.28);
  const ringWidth = Math.max(1, Math.round(size * 0.05));

  const radius =
    shape === AvatarShape.circle
      ? size / 2
      : shape === AvatarShape.rounded
      ? theme.inputRoundness
      : 0;

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: radius,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    },
    border: {
      borderWidth: ringWidth,
      borderColor: theme.colors.outlineVariant,
    },
    image: {
      width: size,
      height: size,
      borderRadius: radius,
    },
    initials: {
      fontSize: Math.round(size * 0.4),
      lineHeight: Math.round(size * 0.5),
      ...theme.fonts.medium,
    },
    status: {
      position: 'absolute',
      right: shape === AvatarShape.circle ? size * 0.02 : -statusSize / 4,
      bottom: shape === AvatarShape.circle ? size * 0.02 : -statusSize / 4,
      width: statusSize,
      height: statusSize,
      borderRadius: statusSize / 2,
      borderWidth: ringWidth,
      borderColor: theme.colors.surface,
    },
    available: {
      backgroundColor: theme.colors.statusAvailableColor,
    },
    busy: {
      backgroundColor: theme.colors.statusBusyColor,
    },
    offline: {
      backgroundColor: theme.colors.outline,
    },
  });
};

export default memo(CustomAvatar);
