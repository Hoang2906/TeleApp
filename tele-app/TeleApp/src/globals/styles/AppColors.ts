class AppColors {
  static colorTransparent = "rgba(0,0,0,0)"
  static colorPrimary = '#007AFF';
  static color5D7B8B = '#5D7B8B';
  static color112A37 = '#112A37';
  static colorFFF = '#FFFFFF';
  static color0BD072 = '#0BD072';
  static colorFF8328 = '#FF8328';
  static color000 = '#000000';
  static colorF62B74 = '#F62B74';
  static colorDefault = '#7E7E82';
}

export const lightColorPalette: ColorPalette = {
  backgroundColor1: '#FFF',
  backgroundColor2: '#F6F6F6',
  backgroundColor3: '#7676801F',
  backgroundColor4: '#E1FEC6',
  textColor1: 'black',
  textPrimary: '#007AFF',
  textColor2: '#8E8E93',
};

export const darkColorPalette: ColorPalette = {
  backgroundColor1: 'black',
  backgroundColor2: '#1C1C1E',
  backgroundColor3: '#000',
  backgroundColor4: '#000',
  textPrimary: '#8E8E93',
  textColor1: 'white',
  textColor2: '#8E8E93',
};

interface ColorPalette {
  // background color
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundColor3: string;
  backgroundColor4: string;

  // text color
  textPrimary: string;
  textColor1: string;
  textColor2: string;
}

export default AppColors;
