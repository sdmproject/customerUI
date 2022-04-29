import "./App.css";
import axios from "axios";
import Menu from "./Containers/Menu";
import Home from "./Containers/Home";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Fab} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { sendOrder, sendPrime } from "./Functions/api";
import Loading from "./Components/Loading"
import Cookies from "js-cookie"


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
  const [commentAble, setCommentAble] = useState(false)
  const [linePayUrl, setLinePayUrl] = useState(null)

  const loadingRef = useRef(null)
  
  useEffect(()=>{
    let url
    url = Cookies.get("linePayUrl")
    if(url){
      setLinePayUrl(url)
    }
  }, [])

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
    const haveOrdered = Cookies.get("orderID")
    if(haveOrdered){
      setCommentAble(true)
    }
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
    let thisModal = loadingRef.current
    thisModal.style.display = "block"
    const data = await sendOrder(cart);
    try{
      const payment = await sendPrime(cart);
      // expire in 5 minute 
      Cookies.set("linePayUrl", payment.data.payment_url, { secure: true, expires: 1/ 288})
      setLinePayUrl(payment.data.payment_url)
    }

    catch{
      console.log("error occur, please pay by cash")
    }
    setShowAlert(data);
    thisModal.style.display = "none"
  };

  const onClick_openLinePay = () => {
    const newWindow = window.open(linePayUrl, '_blank')
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          {/* basename={process.env.PUBLIC_URL} */}
          <Routes>
            {/* <Route
              exact
              path="/"
              element={<Navigate to="" replace={true} />}
            /> */}
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
        <Loading modalRef={loadingRef}></Loading>
      </div>
      {linePayUrl !== null
      ?
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 70, 

        left: "50%",
        transform: "translate(-50%,-50%)", zIndex: 101 }}
          onClick={onClick_openLinePay}
        >
          <NavigationIcon sx={{ mr: 1 }} />
            使用LinePay付款
        </Fab>
      : 
        null
      }

      
    </ThemeProvider>
  );
}

export default App;
