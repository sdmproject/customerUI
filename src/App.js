import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import OrdersPage from "./Containers/OrdersPage";
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
  getTradeResult,
  getOrderById,
} from "./Functions/api";
import "tocas/dist/tocas.min.css";
import "tocas/dist/tocas.min.js";
import { Loginpage } from "./Containers/Loginpage";
import RequireAuth from "./Components/RequireAuth";
import { IntlProvider, FormattedMessage } from "react-intl";
import Intl from "./Components/Intl";
import message_zh from "./lang/zh.json";
import message_en from "./lang/en.json";
import { ReactSession } from "react-client-session";
import { InitMixpanel, AuthListener } from "./Mixpanel/mixpanel";
import mixpanel from "mixpanel-browser";

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
  const [historyOrders, setHistoryOrders] = useState([]);

  ReactSession.setStoreType("localStorage");
  ReactSession.set("isTakeOut", true);
  ReactSession.set("minutesLater", 15);
  ReactSession.set("herePeople", 1);

  const [orders, setOrders] = useState([]);
  const [forceIntervalUpdate, setForceIntervalUpdate] = useState(0);
  const messages = {
    zh: message_zh,
    en: message_en,
  };

  const loadingRef = useRef(null);

  const getTotalPrice = (cart) => {
    let sum = 0;
    cart.map((obj) => {
      sum += obj.price * obj.dishesNum;
    });
    return sum;
  };

  useEffect(async () => {
    // console.log("sd");
    InitMixpanel();
    const { data } = await getOrderById();
    // console.log(data);
    setHistoryOrders(data);
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
    const getMenuData = async (resturantID, lang) => {
      try {
        // const { data } = await axios.get(`https://api.eatba.tk/menu/${resturantID}`);
        const data = await getMenuApi(resturantID, lang);
        if (data) {
          // console.log(data);
          setDishes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // if (dishes.length === 0) {
    getMenuData(resturantID, lang);
    // }
  }, [resturantID, lang]);

  const sendorder = async () => {
    setLinePayUrl(null);
    let thisModal = loadingRef.current;
    thisModal.style.display = "block";
    // change to sendOrder after pay
    // const data = await sendOrderApi(cart);
    // try {
    const _ = await sendPrime(cart);
    // console.log(_);
    setTimeout(async () => {
      const payment = await sendPrime(cart);
      // console.log(payment);
      // console.log(window.payment);
      const now = new Date();
      let newWaitToPay = {
        cart: cart,
        rec_trade_id: payment.data.rec_trade_id,
        linePayUrl: payment.data.payment_url,
        expire: now.getTime() + 60 * 1000,
        havePayed: false,
      };
      let WaitToPayList = [...orders, newWaitToPay];
      setOrders(WaitToPayList);
      let events = {
        // "cart":cart,
        rec_trade_id: payment.data.rec_trade_id,
        "total price": getTotalPrice(cart),
      };
      for (let i = 0; i < cart.length; i++) {
        events[cart[i].name] = cart[i].dishesNum;
      }
      mixpanel.track("send order", events);
      setLinePayUrl(payment.data.payment_url);
    }, 5000);
    // } catch {
    //   console.log("error occur, please pay by cash");
    // }

    setShowAlert("success");
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
                element={
                  <Loginpage
                    authed={authed}
                    setAuthed={setAuthed}
                    setLoginUserProfile={setLoginUserProfile}
                  />
                }
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
                    <Menu
                      dishes={dishes}
                      cart={cart}
                      setCart={setCart}
                      loginUserProfile={loginUserProfile}
                      lang={lang}
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="/cart"
                element={
                  <RequireAuth authed={authed}>
                    <ShoppingCartPage
                      dishes={dishes}
                      cart={cart}
                      setCart={setCart}
                      sendorder={sendorder}
                      showAlert={showAlert}
                      setShowAlert={setShowAlert}
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="/orders"
                element={
                  <RequireAuth authed={authed}>
                    <OrdersPage orders={orders} historyOrders={historyOrders} />
                  </RequireAuth>
                }
              />
            </Routes>
            <BottomNav authed={authed} cart={cart} />
          </BrowserRouter>
          <Loading modalRef={loadingRef}></Loading>
        </div>
        <Intl setLang={setLang} />
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
