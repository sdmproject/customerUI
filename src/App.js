import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Loading from "./Components/Loading";
import Cookies from "js-cookie";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  getMenuApi,
  sendOrderApi,
  getResturantsApi,
  sendPrime,
} from "./Functions/api";
import "tocas/dist/tocas.min.css";
import "tocas/dist/tocas.min.js";
import { Loginpage } from "./Containers/Loginpage";
import RequireAuth from "./Components/RequireAuth";
import { IntlProvider, FormattedMessage } from "react-intl";
import Intl from "./Components/Intl";
import message_zh from "./lang/zh.json";
import message_en from "./lang/en.json";
import { ReactSession } from 'react-client-session';

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
  const [commentAble, setCommentAble] = useState(false);
  const [linePayUrl, setLinePayUrl] = useState(null);
  const [authed, setAuthed] = useState(false);
  const [lang, setLang] = useState(navigator.language.split(/[-_]/)[0]);
  const [loginUserProfile, setLoginUserProfile] = useState(null);
  ReactSession.setStoreType("localStorage");
  ReactSession.set("isTakeOut", true);
  ReactSession.set("minutesLater", 15);
  ReactSession.set("herePeople", 1);

  const messages = {
    zh: message_zh,
    en: message_en,
  };

  const loadingRef = useRef(null);

  useEffect(() => {
    let url;
    url = Cookies.get("linePayUrl");
    if (url) {
      setLinePayUrl(url);
    }
  }, []);

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
  }, [resturants.length]);

  useEffect(() => {
    const haveOrdered = Cookies.get("orderID");
    if (haveOrdered) {
      setCommentAble(true);
    }
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
  }, [resturantID, dishes.length]);

  const sendorder = async () => {
    setLinePayUrl(null);
    let thisModal = loadingRef.current;
    thisModal.style.display = "block";
    const data = await sendOrderApi(cart);

    try {
      // since I get the last payment
      const _ = await sendPrime(cart);

      setTimeout(async () => {
        const payment = await sendPrime(cart);
        console.log(payment);
        // expire in 5 minute
        Cookies.set("linePayUrl", payment.data.payment_url, {
          secure: true,
          expires: 1 / 288,
        });
        setLinePayUrl(payment.data.payment_url);
      }, 3000);
    } catch {
      console.log("error occur, please pay by cash");
    }
    setShowAlert(data);
    thisModal.style.display = "none";
  };

  const onClick_openLinePay = () => {
    const newWindow = window.open(linePayUrl, "_blank");
  };

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={lang} messages={messages[lang]} defaultLocale="zh">
        <div className="App">
          <BrowserRouter>
            {/* basename={process.env.PUBLIC_URL} */}
            <Routes>
              <Route
                exact
                path="/"
                element={<Loginpage authed={authed} setAuthed={setAuthed} setLoginUserProfile={setLoginUserProfile} />}
              />
              <Route
                exact
                path="/"
                element={
                  <RequireAuth authed={authed}>
                    <Navigate to="/home" replace={true} />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/home"
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
                path="/menu"
                element={
                  <RequireAuth authed={authed}>
                    <Menu dishes={dishes} cart={cart} setCart={setCart} loginUserProfile={loginUserProfile}></Menu>
                  </RequireAuth>
                }
              />
              <Route
                path="/cart"
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
            <BottomNav authed={authed} cart={cart} />
          </BrowserRouter>
          <Loading modalRef={loadingRef}></Loading>
        </div>
        {linePayUrl !== null ? (
          <Fab
            variant="extended"
            color="primary"
            sx={{
              position: "fixed",
              bottom: 70,

              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 101,
            }}
            onClick={onClick_openLinePay}
          >
            <NavigationIcon sx={{ mr: 1 }} />
            <FormattedMessage
              id="app.uselinepay"
              defaultMessage="使用LinePay付款"
            />
          </Fab>
        ) : null}
        <Intl setLang={setLang} />
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
