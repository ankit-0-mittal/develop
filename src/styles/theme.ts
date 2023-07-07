export const themeColors = {
  accent: '#0078CE',
  greyishBlue: '#647689',
  primary: '#415060',
  error: '#ff000',
  textSecondary: '#A7B1C6',
  lightGrey: '#E5E7EB',
  darkGrey: '#2D3142',
  white: '#fff',
  primaryButton: '#31AAB7',
  primaryDisabled: 'rgba(109, 205, 216, 0.8)',
  primaryHover: '#129AA6',
  secondaryBtn: 'rgba(167, 177, 198, 0.08)',
  fadedBlack: '#00000040',
  black: '#000',
  success: '#28A745',
  fail: '#DC3545',
  darkBlue: '#1D252F',
  transparent: '#00000000',
};

export const themeFonSizes = {
  small: 11,
};

export const addAlpha = (color, opacity) => {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};
