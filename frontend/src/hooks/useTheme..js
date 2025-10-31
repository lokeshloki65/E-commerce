import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTheme = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Apply the selected theme class to the html element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
};

export default useTheme;
