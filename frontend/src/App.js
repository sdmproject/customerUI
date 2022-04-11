import "./App.css";
import Menu from "./Containers/Menu";
import { useEffect, useState } from "react";
// instead of "Switch", in version 6, Switch is discarded
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShoppingCartPage from "./Containers/ShoppingCartPage";
import BottomNav from "./Components/BottomNav";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import axios from "axios";
import { getMenuData } from "./Functions/api"


// BUG:cart在一開始傳給別的container時會是空的(雖然在App.js印出來是有東西的)，所以一定要進行至少一次頁面切換後，才能正確傳遞

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

// const dishes = [
//   {
//     name: "義大利麵",
//     img: "./1.jpg",
//     type: "主食",
//     price: 1000,
//     description: "好吃的義大利麵",
//   },
//   {
//     name: "冰淇淋",
//     img: "./2.jpg",
//     type: "甜點",
//     price: 100,
//     description: "好吃的冰淇淋",
//   },
//   {
//     name: "白飯",
//     img: "./3.jpg",
//     type: "主食",
//     price: 10,
//     description: "好吃的白飯",
//   },
//   {
//     name: "燙青菜",
//     img: "./4.jpg",
//     type: "配菜",
//     price: 50,
//     description: "好吃的蔡",
//   },
//   {
//     name: "可樂",
//     img: "./5.jpg",
//     type: "飲料",
//     price: 30,
//     description: "好吃的飲料",
//   },
//   {
//     name: "雪碧",
//     img: "./6.jpg",
//     type: "飲料",
//     price: 30,
//     description: "好吃的雪碧",
//   },
//   {
//     name: "生菜沙拉",
//     img: "./7.jpg",
//     type: "沙拉",
//     price: 88,
//     description: "好吃的沙拉",
//   },
// ];

// async function getDishesData() {

//   const Data = await axios.get("https://api.eatba.tk/menu/1");
//   console.log(Data.data);
//   // dishes = Data.data;
//   // setDishes(Data.data);
//   return Data.data;
// }

function App() {
  const [cart, setCart] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(async () => {

    const resturantID = 1;

    const dishesData = await getMenuData(resturantID);
    if (dishesData) {
      setDishes(dishesData);

      let cartTemp = {};
      let data = dishesData;

      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        cartTemp[data[i].name] = [];
      }
      setCart(cartTemp);
      console.log(cartTemp);

    }

    console.log("dishes.length");
    console.log(dishes.length);// setDishes 尚未生效 length會是0, 要在useEffect之外才會生效

  }, []);
  //用假資料dishes不會更改



  // // get dishes
  // console.log('get dished data start');

  // const response = await axios.get("https://api.eatba.tk/menu/1");
  // console.log(response.data);
  // setDishes(response.data);

  // console.log("dishes.length");
  // console.log(dishes.length);


  // console.log(dishesData.data);



  // setDishes(getDishesData());

  // axios.get("https://api.eatba.tk/menu/1").then(response => {
  //   console.log(response.data);
  //   setDishes(response.data);
  //   console.log('get data finished');
  // });



  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          {/* <Link to="/">
            <div>Menu</div>
          </Link>
          <Link to="/cart">
            <div>cart</div>
          </Link> */}
          <Routes>
            {/* <Route
              exact
              path="/"
              element={
                <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
              }
            /> */}
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
                ></ShoppingCartPage>
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
