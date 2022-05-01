import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sendOrder } from "./Functions/api";
import { Loginpage } from "./Containers/Loginpage";
import RequireAuth from "./Components/RequireAuth";

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
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const { data } = await axios.get(`https://api.eatba.tk/restaurants`);
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

      getMenuData();
    }
  }, [resturants.length]);

  useEffect(() => {
    const getMenuData = async (resturantID) => {
      try {
        const { data } = await axios.get(
          `https://api.eatba.tk/menu/${resturantID}`
        );
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
  }, [resturantID, dishes.length]);

  const sendorder = async () => {
    const data = await sendOrder(cart);
    setShowAlert(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          {/* basename={process.env.PUBLIC_URL} */}
          <Routes>
            <Route
              exact
              path="/"
              element={<Loginpage authed={authed} setAuthed={setAuthed} />}
            />
            <Route
              exact
              path="/customerUI"
              element={
                <RequireAuth authed={authed}>
                  <Navigate to="/customerUI/home" replace={true} />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/customerUI/home"
              element={
                <RequireAuth authed={authed}>
                  <Home
                    resturants={resturants}
                    setResturantID={setResturantID}
                  />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/customerUI/menu"
              element={
                <RequireAuth authed={authed}>
                  <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
                </RequireAuth>
              }
            />
            <Route
              path="/customerUI/cart"
              element={
                <RequireAuth authed={authed}>
                  <ShoppingCartPage
                    cart={cart}
                    setCart={setCart}
                    sendorder={sendorder}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                  />
                </RequireAuth>
              }
            />
          </Routes>
          <BottomNav authed={authed} />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
