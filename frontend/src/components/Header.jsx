import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div>
      <div className="navbar z-50 fixed top-0 bg-base-100 dark:bg-gray-800 p-4">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl dark:text-white">
            ROYAL TEAK
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal font-medium px-1">
            <li>
              <Link to={"/cart"} className="dark:text-white">
                Cart ({cartItem?.length || 0})
              </Link>
            </li>
            <li>
              <details className="dropdown">
                <summary className="dark:text-white">kavin</summary>
                <ul className="bg-base-100 dark:bg-gray-700 rounded-t-none p-2 left-0">
                  <li>
                    <select
                      className="w-full p-2 dark:text-white dark:bg-gray-700"
                      value={theme}
                      onChange={handleThemeChange}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="cupcake">Cupcake</option>
                      <option value="bumblebee">Bumblebee</option>
                      <option value="emerald">Emerald</option>
                      <option value="corporate">Corporate</option>
                      <option value="synthwave">Synthwave</option>
                      <option value="retro">Retro</option>
                    </select>
                  </li>
                  <li>
                    <a className="dark:text-white">Profile</a>
                  </li>
                  <li>
                    <a className="dark:text-white">Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
