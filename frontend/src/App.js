import "./App.css";
import Menu from "./Containers/Menu";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { getMenuData } from "./Functions/api";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffe365",
    },
    secondary: {
      main: "#6581ff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9665",
    },
    info: {
      main: "#65ffe3",
    },
    success: {
      main: "#81ff65",
    },
  },
});

function App() {
  const [cart, setCart] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(async () => {
    if (dishes.length === 0) {
      const resturantID = 1;
      const dishesData = await getMenuData(resturantID);
      if (dishesData) {
        setDishes(dishesData);
        let cartTemp = {};
        let data = dishesData;
        for (let i = 0; i < data.length; i++) {
          cartTemp[data[i].name] = [];
        }
        setCart(cartTemp);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to="/menu" replace={true} />}
            />
            <Route
              exact
              path="/menu"
              element={
                <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
              }
            />
            <Route
              path="/cart"
              element={
                <ShoppingCartPage
                  dishes={dishes}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
