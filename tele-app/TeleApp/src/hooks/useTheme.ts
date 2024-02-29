import {useDispatch, useSelector} from 'react-redux';
import {toggle} from '../store/slices/themeSlice';
import {useAppSelector} from '../store/store';
import { darkColorPalette, lightColorPalette } from "../globals/styles/AppColors";

export default function useTheme() {
  const dispatch = useDispatch();
  const theme = useAppSelector(state => state.theme);

  function toggleTheme() {
    dispatch(toggle());
  }

  const isDark = theme === "dark"

  const colorPalette = theme == 'light' ? lightColorPalette :  darkColorPalette

  return {
    theme,
    toggleTheme,
    colorPalette,
    isDark
  };
}
