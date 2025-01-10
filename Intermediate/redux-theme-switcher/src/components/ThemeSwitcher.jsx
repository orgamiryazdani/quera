import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME_TYPE } from "../constants";
import { setTheme } from "../store/actions";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme);

  const handleThemeChange = (e) => {
    const newTheme = themeMode === THEME_TYPE.LIGHT ? THEME_TYPE.DARK : THEME_TYPE.LIGHT;
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="switch-container">
      <label className="switch">
        <input
          data-testid="theme-changer"
          type="checkbox"
          checked={themeMode === THEME_TYPE.DARK}
          onChange={handleThemeChange}
        />
        <span className="slider round"></span>
      </label>
      <span className="text-color bold">Dark mode</span>
    </div>
  );
};

export default ThemeSwitcher;
