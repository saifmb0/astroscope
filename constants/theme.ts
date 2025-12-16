/**
 * AstroScope Premium Theme
 * Dark mode space tech aesthetic with glassmorphism
 */

export const Colors = {
  // Base colors
  background: '#0A0E27',
  backgroundSecondary: '#131829',
  backgroundTertiary: '#1A1F3A',
  
  // Accent colors
  primary: '#00D9FF', // Cyan
  primaryDark: '#00A8CC',
  secondary: '#9D4EDD', // Purple
  accent: '#06FFA5', // Neon green
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#B4B4C5',
  textTertiary: '#6B6B7B',
  
  // Status colors
  success: '#06FFA5',
  warning: '#FFB800',
  error: '#FF3B6D',
  info: '#00D9FF',
  
  // Glassmorphism
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassHighlight: 'rgba(255, 255, 255, 0.15)',
  
  // Overlays
  overlay: 'rgba(10, 14, 39, 0.8)',
  overlayDark: 'rgba(10, 14, 39, 0.95)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'Courier',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: {
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
};

export const Animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    spring: 'spring',
  },
};
