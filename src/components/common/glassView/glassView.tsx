import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type GlassViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  effect?: EffectEnum;
  interactive?: boolean;
  border?: boolean;
};

export enum EffectEnum {
  Clear = 'clear',
  None = 'none',
  Regular = 'regular',
}

const GlassView = ({
  effect = EffectEnum.Regular,
  interactive = false,
  ...props
}: GlassViewProps) => {
  /** to get the default theme of app */
  const theme = useTheme();

  /** theme integration in styles */
  const styles = makeStyle(theme, props.border);

  /** getting styles from parent screen */
  const styled = {
    ...props.style,
    ...(props.border ? { borderWidth: 1 } : {}),
    ...(props.border ? { borderColor: `${theme.colors.border}4d` } : {}),
  };

  return (
    <LiquidGlassView
      style={[!isLiquidGlassSupported && styles.customGlass, styled]}
      interactive={interactive}
      effect={effect}
      colorScheme={theme.dark ? 'dark' : 'light'}
    >
      {props.children}
    </LiquidGlassView>
  );
};

const makeStyle = (theme: CustomTheme, bordered?: boolean) =>
  StyleSheet.create({
    customGlass: {
      borderWidth: 0.6,
      backgroundColor: bordered
        ? `${theme.colors.outline}1d`
        : `${theme.colors.outline}3d`,
      borderColor: `${theme.colors.border}4d`,
    },
  });

export default GlassView;
