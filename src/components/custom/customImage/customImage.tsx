import { Images } from '@/theme/assets/images';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import FastImage, { ImageStyle } from '@d11/react-native-fast-image';
import React, { memo, useState } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, View } from 'react-native';
import { SvgProps, SvgUri } from 'react-native-svg';
import { LocalSvg } from 'react-native-svg/css';

export enum ImageType {
  png = 'png',
  svg = 'svg',
}

export enum ResizeModeType {
  cover = 'cover',
  contain = 'contain',
  stretch = 'stretch',
  center = 'center',
}

export type CustomImageProps = {
  source: any; // Accepts require() for local images or a URI for remote images
  errorSource?: any;
  color?: string; // Optional tint color
  fillColor?: string; // Optional tint color
  style?: StyleProp<ImageStyle> | SvgProps; // Unified style prop for both SVG and PNG
  type?: ImageType;
  resizeMode?: ResizeModeType;
};

function CustomImage({
  errorSource = Images.errorImage,
  type = ImageType.png,
  ...props
}: CustomImageProps) {
  const theme = useTheme(); // theme

  const styles = makeStyles(theme); // access StylesSheet with theme implemented

  const [hasError, setHasError] = useState(false);

  const [loading, setLoading] = useState(false);

  // Helper function to determine if the source is a URI
  const isUri = (source: any): source is { uri: string } =>
    typeof source === 'object' && source !== null && 'uri' in source;

  const isSvg = type === ImageType.svg;

  //checking if the image is remote or local
  const isRemote = isUri(props.source);

  if (hasError) {
    return (
      // <Image
      //   source={errorSource}
      //   resizeMode={ResizeModeType.contain}
      //   style={[props.style as StyleProp<ImageStyle>]}
      // />
      <FastImage
        source={props.source}
        style={[props.style as StyleProp<ImageStyle>]}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }

  if (isSvg) {
    // SVG dimensions come from width/height PROPS, not a `style` object —
    // and callers (or wrappers like CustomTextInput) frequently pass an
    // ARRAY of styles. Spreading an array directly would yield numeric
    // keys ({0:…, 1:…}) instead of width/height, so the size silently
    // never applied. Flatten to a single plain object first so width /
    // height (and any other props) reach the SVG correctly.
    const svgStyle = (StyleSheet.flatten(
      props.style as StyleProp<ImageStyle>,
    ) ?? {}) as SvgProps;

    if (isUri(props.source)) {
      // Handle remote SVG using SvgUri
      return props.fillColor ? (
        <SvgUri
          uri={props.source.uri}
          {...svgStyle}
          color={props.color}
          fill={props.fillColor}
          onError={() => {
            setHasError(true);
          }} // Handle error event
        />
      ) : (
        <SvgUri
          uri={props.source.uri}
          {...svgStyle}
          color={props.color}
          onError={() => {
            setHasError(true);
          }} // Handle error event
        />
      );
    } else {
      // Handle local SVG file
      return props.fillColor ? (
        <LocalSvg
          asset={props.source}
          {...svgStyle}
          color={props.color}
          fill={props.fillColor}
        />
      ) : (
        <LocalSvg asset={props.source} {...svgStyle} color={props.color} />
      );
    }
  }

  return (
    // <Image
    //   source={props.source}
    //   style={[props.style as StyleProp<ImageStyle>]}
    //   tintColor={props.color}
    //   resizeMode={props.resizeMode}
    //   onError={() => {
    //     setHasError(true);
    //   }} // Handle error event
    //   //loadingIndicatorSource={Images.typeLoading}
    // />
    <View style={[props.style as StyleProp<ImageStyle>]}>
      <FastImage
        source={props.source}
        style={[props.style as StyleProp<ImageStyle>]}
        tintColor={props.color}
        resizeMode={props.resizeMode && FastImage.resizeMode[props.resizeMode]}
        onError={() => {
          setHasError(true);
        }}
        onLoadStart={() => isRemote && setLoading(true)}
        onLoadEnd={() => isRemote && setLoading(false)}
      />
      {isRemote && loading && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    loader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

export default memo(CustomImage);
