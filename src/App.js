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
  const [historyOrders, setHistoryOrders] = useState([]);
  const [forceOrderUpdate, setForceOrderUpdate] = useState(0);
  const [userName, setUserName] = useState("--anonymous");
  const [google_ID, setGoogle_ID] = useState("");






  const [orders, setOrders] = useState([]);
  const [forceIntervalUpdate, setForceIntervalUpdate] = useState(0)
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
    console.log('--------------------------useEffect');
    InitMixpanel();
    const { data } = await getOrderById();
    setHistoryOrders(data);
    ReactSession.setStoreType("localStorage");
    ReactSession.set("isTakeOut", true);
    ReactSession.set("minutesLater", 15);
    ReactSession.set("herePeople", 1);
    ReactSession.set("username", "--anonymous");
    ReactSession.set("image_URL", "");
    ReactSession.set("email", "");
    ReactSession.set("google_ID", "");
  }, []);

  useEffect(async () => {
    const { data } = await getOrderById();
    setHistoryOrders(data)
  }, [forceOrderUpdate]);
  useEffect(() => {
    const getResturantsData = async () => {
      try {
        const data = await getResturantsApi(lang);
        if (data) {
          setResturants(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // if (resturants.length === 0) {
    // console.log("into get resturants");
    getResturantsData(lang);
    // }
  }, [lang]);

  useEffect(() => {
    const haveOrdered = Cookies.get("orderID");
    if (haveOrdered) {
      setCommentAble(true);
    }
    const getMenuData = async (resturantID, lang) => {
      try {
        const data = await getMenuApi(resturantID, lang);
        if (data) {
          // console.log(data);
          setDishes(data);
          ReactSession.set("dishData", data);

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
    try {
      const _ = await sendPrime(cart);
      console.log(_)
      setTimeout(async () => {
        const payment = await sendPrime(cart);
        const now = new Date()
        let newWaitToPay = { "cart": cart, "rec_trade_id": payment.data.rec_trade_id, "linePayUrl": payment.data.payment_url, "expire": now.getTime() + 60 * 1000, "havePayed": false }
        let WaitToPayList = [...orders, newWaitToPay]
        setOrders(WaitToPayList)
        setLinePayUrl(payment.data.payment_url);
      }, 6000);
    } catch {
      console.log("error occur, please pay by cash");
    }

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
                element={<Loginpage authed={authed} setAuthed={setAuthed} setUserName={setUserName} setGoogle_ID={setGoogle_ID} />}
              />
              <Route
                exact
                path="/"
                element={
                  // <RequireAuth authed={authed}>
                  <Navigate to="/home" replace={true} />
                  // </RequireAuth>
                }
              />
              <Route
                exact
                path="/home"
                element={
                  // <RequireAuth authed={authed}>
                  <Home
                    resturants={resturants}
                    setResturantID={setResturantID}
                  />
                  // </RequireAuth>
                }
              />
              <Route
                exact
                path="/menu"
                element={
                  // <RequireAuth authed={authed}>
                  <Menu dishes={dishes} cart={cart} setCart={setCart} setDishes={setDishes} lang={lang} userName={userName}></Menu>
                  // </RequireAuth>
                }
              />
              <Route
                path="/cart"
                element={
                  // <RequireAuth authed={authed}>
                  <ShoppingCartPage
                    dishes={dishes}
                    cart={cart}
                    setCart={setCart}
                    sendorder={sendorder}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    authed={authed}
                  />
                  // </RequireAuth>
                }
              />
              <Route
                path="/orders"
                element={
                  <RequireAuth authed={authed}>
                    <OrdersPage
                      orders={orders} setOrders={setOrders} historyOrders={historyOrders} getOrderById={getOrderById} forceOrderUpdate={forceOrderUpdate} setForceOrderUpdate={setForceOrderUpdate} setHistoryOrders={setHistoryOrders}
                      userName={userName} google_ID={google_ID}
                    />
                  </RequireAuth>
                }
              />
            </Routes >
            <BottomNav authed={authed} cart={cart} />
          </BrowserRouter >
          <Loading modalRef={loadingRef}></Loading>
        </div >
        <Intl setLang={setLang} />
      </IntlProvider >
    </ThemeProvider >
  );
}

export default App;
