const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
/**
 * RN 0.87 moved `@react-native/assets-registry` into core as the
 * `react-native/asset-registry` subpath export. react-native-svg (<=15.15.5)
 * still imports the old package path, so point it at core's registry — the
 * same one Metro's `assetRegistryPath` writes into.
 * Remove once react-native-svg ships an RN 0.87-compatible release.
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@react-native/assets-registry/registry')) {
        return context.resolveRequest(
          context,
          'react-native/asset-registry',
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
