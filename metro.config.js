const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const customConfig = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // SVG desteği
  },
  resolver: {
    assetExts: assetExts
      .filter(ext => ext !== 'svg') // SVG artık sourceExts'e taşındı
      .concat(['bin', 'png', 'ttf', 'mp4']), // Ek dosya uzantıları
    sourceExts: [...sourceExts, 'svg', 'js', 'jsx', 'ts', 'tsx'],
  },
};

const mergedConfig = mergeConfig(defaultConfig, customConfig);

// En son wrapWithReanimated ile reanimated desteği sağla
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
