import "./App.css";
import { ThemeContext } from "./Contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Routes/Routes";
import useProduct from "./Hooks/useProduct";

function App() {
  const [products] = useProduct();

  return (
    <ThemeContext.Provider
      value={{
        products,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </ThemeContext.Provider>
  );
}

export default App;
