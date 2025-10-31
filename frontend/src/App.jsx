import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import useTheme from "./hooks/useTheme.";

const App = () => {
  useTheme();

  return (
    <div className="dark:bg-slate-700">
      <Header />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
