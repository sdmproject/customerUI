import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { getMenuApi, sendOrderApi, getResturantsApi } from "./Functions/api";
import 'tocas/dist/tocas.min.css';
import 'tocas/dist/tocas.min.js';

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
  const [resturants, setResturants] = useState([]);
  const [resturantID, setResturantID] = useState("1");
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    const getResturantsData = async () => {
      try {
        // const { data } = await axios.get(`https://api.eatba.tk/restaurants`);
        const data = await getResturantsApi();
        if (data) {
          setResturants(data);
          // console.log("set resturants");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (resturants.length === 0) {
      // console.log("into get resturants");
      getResturantsData();
    }
  }, []);

  useEffect(() => {
    const getMenuData = async (resturantID) => {
      try {
        // const { data } = await axios.get(`https://api.eatba.tk/menu/${resturantID}`);
        const data = await getMenuApi(resturantID);
        if (data) {
          setDishes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dishes.length === 0) {
      getMenuData(resturantID);
    }
  }, [resturantID]);

  const sendorder = async () => {
    const data = await sendOrderApi(cart);
    setShowAlert(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to="/customerUI" replace={true} />}
            />
            <Route
              exact
              path="/customerUI"
              element={<Navigate to="/customerUI/home" replace={true} />}
            />
            <Route
              exact
              path="/customerUI/home"
              element={
                <Home resturants={resturants} setResturantID={setResturantID} />
              }
            />
            <Route
              exact
              path="/customerUI/menu"
              element={
                <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
              }
            />
            <Route
              path="/customerUI/cart"
              element={
                <ShoppingCartPage
                  cart={cart}
                  setCart={setCart}
                  sendorder={sendorder}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
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
