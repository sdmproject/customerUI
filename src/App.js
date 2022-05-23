import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import OrdersPage from "./Containers/OrdersPage"
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
  test
} from "./Functions/api";
import "tocas/dist/tocas.min.css";
import "tocas/dist/tocas.min.js";
import { Loginpage } from "./Containers/Loginpage";
import RequireAuth from "./Components/RequireAuth";
import { IntlProvider, FormattedMessage } from "react-intl";
import Intl from "./Components/Intl";
import message_zh from "./lang/zh.json";
import message_en from "./lang/en.json";
// test commit for deploy

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

  const [orders, setOrders] = useState([]); 
  const [forceIntervalUpdate, setForceIntervalUpdate] = useState(0)
  const messages = {
    zh: message_zh,
    en: message_en,
  };

  const loadingRef = useRef(null);

  useEffect(async() => {
    test()
  }, []);

  // useEffect(() => {
  //   let interval
  //   // setTimeout(() => {
  //     interval = setInterval( async() => {
  //       let temp = orders
  //       // console.log("start update")
  //       let toRemove = []
  //       // console.log(orders)
  //       for (let i = 0; i < orders.length; i++){
  //           const tradeStatus = await getTradeResult(temp[i]["rec_trade_id"])
  //           // console.log(tradeStatus)
  //           // 
  //           if (tradeStatus.data.trade_history.length > 1){
  //             // f = temp.slice(0, i)
  //             // b = temp.slice(i + 1, temp.length)
  //             temp[i]["expire"] += 86400 * 1000
  //             temp[i]["havePayed"] = true
  //             sendOrderApi(temp[i]["cart"])
  //             localStorage.setItem('orders', JSON.stringify(temp));
  //             setOrders(temp) 
  //           }
            
  //           // const now = new Date()
  //           // if(now.getTime() > orders[i]["expire"])
  //           //   toRemove.push(i)  
  //         // }
  //       }
  //       // for (let i = 0; i < toRemove.length; i++){
  //       //   temp = temp.splice(temp.findIndex(x => x === orders[toRemove[i]]), 1)
  //       // }


  //       setForceIntervalUpdate((x) => x+1)
  //     }, 5000); 
  //   // }, 5000);

  //   return () => {
  //     console.log(`clearing interval`);
  //     clearInterval(interval);
  //   };
  // }, [forceIntervalUpdate]);

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
    // change to sendOrder after pay
    // const data = await sendOrderApi(cart);
    try {
    // since I get the last payment
      // const waitToPayList =  JSON.parse(localStorage.getItem('orders'));
      // if(waitToPayList)
        // setOrders(waitToPayList)
      const _ = await sendPrime(cart);
      console.log(_)
      setTimeout(async () => {
        const payment = await sendPrime(cart);
        console.log(payment)
        const now = new Date()

        let newWaitToPay = {"cart":cart, "rec_trade_id":payment.data.rec_trade_id, "linePayUrl":payment.data.payment_url, "expire":now.getTime() + 60* 1000, "havePayed":false}
        // console.log(newWaitToPay)
        let WaitToPayList = [...orders, newWaitToPay]
        setOrders(WaitToPayList)
        // localStorage.setItem('orders', JSON.stringify(WaitToPayList));
        setLinePayUrl(payment.data.payment_url);
      }, 3000);
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
                element={<Loginpage authed={authed} setAuthed={setAuthed} />}
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
                    <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
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
              <Route
                path="/orders"
                element={
                  <RequireAuth authed={authed}>
                    <OrdersPage
                      orders={orders}
                    />
                   </RequireAuth>
                }
              />
            </Routes>
            <BottomNav authed={authed} />
          </BrowserRouter>
          <Loading modalRef={loadingRef}></Loading>
        </div>
        {/* {linePayUrl !== null ? (
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
        ) : null} */}
        {/* <button onClick={()=> console.log(orders)}>test</button> */}
        <Intl setLang={setLang} />
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
