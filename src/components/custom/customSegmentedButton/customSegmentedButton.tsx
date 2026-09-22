import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import React, { useEffect } from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ImageType } from '../customImage/customImage';
import CustomText, { TextVariants } from '../customText/customText';
import { Shadow } from '../shadow/shadow';
import { Tap } from '../tap/tap';

export type SegmentedButtonItem = {
  label?: string;
  value?: string;
  loading?: boolean;
  /** Added by @Akshita 19-08-26 ---> Optional icon displayed before the label (DP-449) */
  icon?: {
    source: ImageSourcePropType;
    type?: ImageType;
    color?: string;
  };
  /** Added by @Akshita 19-08-26 ---> Optional label/icon color of the item (DP-449) */
  color?: string;
  /** Added by @Akshita 19-08-26 ---> Blocks the press and dims the item (DP-449) */
  disabled?: boolean;
};

type Props = {
  items?: SegmentedButtonItem[];
  selected?: SegmentedButtonItem;
  setSelected?: (item: SegmentedButtonItem) => void;
  style?: StyleProp<ViewStyle>;
  lableStyle?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  maxFontSizeMultiplier?: number;
  textVariant?: TextVariants;
  /**
   * Added by @Akshita 19-08-26 ---> Displays every item as a raised segment, used when the
   * buttons trigger an action instead of holding a selection (DP-449) */
  highlightAll?: boolean;
};

function CustomSegmentedButton({
  allowFontScaling = false,
  textVariant = TextVariants.labelMedium,
  highlightAll = false,
  ...props
}: Props) {
  const theme = useTheme();

  const styles = makeStyles(theme);

  useEffect(() => {
    /** Modified by @Akshita 19-08-26 ---> Action buttons do not hold a selection (DP-449) */
    if (
      !highlightAll &&
      props.items &&
      props.items.length > 0 &&
      !props.selected
    ) {
      if (props.setSelected) {
        props.setSelected(props.items[0]);
      }
    }
  }, [props.items]);

  /** Added by @Akshita 19-08-26 ---> Renders the label of an item along with its icon (DP-449) */
  const renderItemLabel = (item: SegmentedButtonItem) => {
    return (
      <CustomText
        maxFontSizeMultiplier={props.maxFontSizeMultiplier}
        variant={textVariant}
        color={item.color ?? theme.colors.onSurface}
        allowFontScaling={allowFontScaling}
        style={props.lableStyle ? props.lableStyle : styles.label}
      >
        {item.label}
      </CustomText>
    );
  };

  return (
    <Shadow inset style={[styles.buttonContainer, props.style]}>
      {props.items?.map((item, index) => (
        <Tap
          key={`segmented${item.value}`}
          containerStyle={[
            styles.tapArea,
            item.disabled ? styles.disabledTapArea : undefined,
          ]}
          onPress={() => {
            if (!item.loading && !item.disabled) {
              if (props.setSelected) {
                props.setSelected(item);
              }
            }
          }}
        >
          {highlightAll || props.selected?.value == item.value ? (
            <Shadow style={styles.shadow}>{renderItemLabel(item)}</Shadow>
          ) : (
            renderItemLabel(item)
          )}
        </Tap>
      ))}
    </Shadow>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.background,
      padding: 2,
    },
    tapArea: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderRadius: theme.roundness,
    },
    /** Added by @Akshita 19-08-26 ---> Style of a disabled item (DP-449) */
    disabledTapArea: {
      opacity: 0.5,
    },
    shadow: {
      paddingVertical: 8,
      paddingHorizontal: 0,
      backgroundColor: theme.colors.surface,
      marginHorizontal: 1,
    },
    label: { alignSelf: 'center', textAlign: 'center' },
    /** Added by @Akshita 19-08-26 ---> Styles of an item having an icon (DP-449) */
    labelLay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    icon: {
      height: 14,
      width: 14,
    },
  });

export default CustomSegmentedButton;
