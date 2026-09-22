import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import {
  LegendList,
  LegendListRef,
  ViewabilityConfigCallbackPairs,
} from '@legendapp/list/react-native';
import React, { forwardRef, ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export enum keyboardShouldPersistTapsType {
  always = 'always',
  never = 'never',
  handled = 'handled',
}

export enum keyboardDismissModeType {
  none = 'none',
  interactive = 'interactive',
  ondrag = 'on-drag',
}

// options for component
type Props<T> = {
  data: T[];
  ListEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  onEndReachedThreshold?: number;
  onEndReached?: () => void;
  onRefresh?: () => void;
  ItemSeparatorComponent?: React.ComponentType<any>;
  refreshing?: boolean;
  keyExtractor?: (item: T, index: number) => string;
  renderItem: (props: {
    item: T;
    index: number;
    extraData: any;
    itemType?: string;
  }) => ReactNode;
  keyboardShouldPersistTaps?: keyboardShouldPersistTapsType;
  keyboardDismissMode?: keyboardDismissModeType;
  horizontal?: boolean;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  inverted?: boolean;
  nestedScrollEnabled?: boolean;
  initialScrollIndex?: number;
  /**
   * Added by @Shivang 20-08-2026 ---> FYN-16975
   * Start the list on its last item.
   *
   * Use this instead of `initialScrollIndex` when new items can still arrive
   * before the list has settled. `initialScrollIndex` saves a fixed position
   * number, so if older items get added at the top that number ends up
   * pointing at the wrong item. This one always aims at whatever the last
   * item is at that moment.
   */
  initialScrollAtEnd?: boolean;
  onScrollToIndexFailed?: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  updateCellsBatchingPeriod?: number;
  numColumns?: number;
  extraData?: any;
  overrideProps?: object;
  scrollEnabled?: boolean;
  getItemType?: (item: T, index: number) => string;
  viewabilityConfigCallbackPairs?: ViewabilityConfigCallbackPairs<T>;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onStartReachedThreshold?: number;
  onStartReached?: (info: { distanceFromStart: number }) => void;
  stickyIndices?: number[];
  estimatedItemSize?: number;
  /**
   * Added by @Shivang 20-08-2026 ---> FYN-16975
   * These are the list's own callbacks, simply passed through so the screen
   * using this component can know when its content height changed and when
   * the user is scrolling it by hand. We do not change what they do.
   */
  onContentSizeChange?: (width: number, height: number) => void;
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onMomentumScrollEnd?: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  onItemSizeChanged?: (info: {
    size: number;
    previous: number;
    index: number;
    itemKey: string;
    itemData: T;
  }) => void;
};

function CustomFlatList<T>(props: Props<T>, ref: React.Ref<LegendListRef>) {
  const theme = useTheme(); // theme

  const styles = makeStyles(theme); // access StylesSheet with theme implemented

  /** Added by @Tarun 24-03-2025 -> flash list for showing list (FYN-5971) */
  return (
    <LegendList
      ref={ref}
      scrollEnabled={props.scrollEnabled}
      data={props.data}
      extraData={[theme.dark, props.extraData]}
      horizontal={props.horizontal}
      recycleItems={true}
      alignItemsAtEnd={props.inverted ? true : false}
      maintainScrollAtEnd={props.inverted ? true : false}
      maintainVisibleContentPosition={true}
      nestedScrollEnabled={props.nestedScrollEnabled}
      keyExtractor={props.keyExtractor}
      renderItem={props.renderItem}
      numColumns={props.numColumns}
      ItemSeparatorComponent={props.ItemSeparatorComponent}
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      ListEmptyComponent={props.ListEmptyComponent ?? undefined}
      ListHeaderComponent={props.ListHeaderComponent ?? undefined}
      ListFooterComponent={props.ListFooterComponent ?? undefined}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
      keyboardDismissMode={props.keyboardDismissMode}
      initialScrollAtEnd={props.initialScrollAtEnd}
      /* Added by @Shivang 20-08-2026 ---> FYN-16975
       * `initialScrollAtEnd` already points at the last item, so we only use
       * an explicit index when the caller did not ask for it. */
      initialScrollIndex={
        props.initialScrollAtEnd ? undefined : props.initialScrollIndex
      }
      onContentSizeChange={props.onContentSizeChange}
      onScrollBeginDrag={props.onScrollBeginDrag}
      onScrollEndDrag={props.onScrollEndDrag}
      onMomentumScrollEnd={props.onMomentumScrollEnd}
      onItemSizeChanged={props.onItemSizeChanged}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
      getItemType={props.getItemType}
      contentContainerStyle={props.contentContainerStyle}
      viewabilityConfigCallbackPairs={props.viewabilityConfigCallbackPairs}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={props.onEndReachedThreshold}
      onStartReached={props.onStartReached}
      onStartReachedThreshold={props.onStartReachedThreshold}
      estimatedItemSize={props.estimatedItemSize ?? 100}
      stickyHeaderIndices={props.stickyIndices}
    />
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      padding: 5,
    },
  });

export default forwardRef(CustomFlatList) as <T>(
  props: Props<T> & { ref?: React.Ref<LegendListRef> },
) => React.ReactElement;
