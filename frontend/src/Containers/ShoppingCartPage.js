import GoodInCart from "../Components/GoodInCart";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Box, Paper, Fab } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import NavigationIcon from "@mui/icons-material/Navigation";
const ShoppingCartPage = ({ dishes, cart, setCart, sendorder }) => {
  const gettotalprice = () => {
    let sum = 0;
    cart.map((obj) => {
      // let dish = dishes.filter((e) => e.id === obj.id)[0];
      sum += obj.price * obj.dishesNum;
    });
    return sum;
  };
  // console.log(cart);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 60,
          boxShadow: 2,
          position: "fixed",
          top: 0,
          zIndex: 100,
          backgroundColor: "primary.main",
          color: "primary.text",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShoppingCart color="primary.text" sx={{ position: "relative" }} />
        Cart
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 60,
          boxShadow: 1,
          position: "fixed",
          top: 60,
          zIndex: 100,
          backgroundColor: "white",
          color: "primary.text",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Total ${gettotalprice(cart)}
      </Box>
      <Box sx={{ height: 120 }} />
      {cart.length > 0 ? (
        cart.map((obj, idx) => (
          <GoodInCart
            key={idx}
            index={idx}
            name={obj.name}
            image={obj.img}
            note={obj.customization}
            number={obj.dishesNum}
            cart={cart}
            setCart={setCart}
          />
        ))
      ) : (
        <div className="text-2xl text-emerald-400 overline top-20 relative">
          購物車裡面沒東西喔~
        </div>
      )}

      <Box sx={{ height: 80 }} />
      {cart.length > 0 ? (
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 70, right: 12, zIndex: 101 }}
          onClick={sendorder}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          送出訂單
        </Fab>
      ) : null}
    </>
  );
};

export default ShoppingCartPage;
