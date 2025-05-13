// IconStyles.ts
import { StyleSheet } from 'react-native';

export const IconStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  xs: { width: 16, height: 16 },
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
  xl: { width: 48, height: 48 },
  primary: { color: '#9747FF' },
  secondary: { color: '#003333' },
  light: { color: '#FFFFFF' },
  dark: { color: '#1A1A1A' },
  rounded: { borderRadius: 8 },
  circle: { borderRadius: 100 },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  }
});