import GoodInCart from "../Components/GoodInCart";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Box, Paper, Fab } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import NavigationIcon from "@mui/icons-material/Navigation";
const ShoppingCartPage = ({ dishes, cart, setCart }) => {
  const [dishesNum, setDishesNum] = useState([]);
  const [cartForMap, setCartForMap] = useState([]);

  useEffect(() => {
    let dishesNumTemp = [];
    let cartForMapTemp = [];
    for (let i = 0; i < dishes.length; i++) {
      let existNote = [];
      for (let j = 0; j < cart[dishes[i].name].length; j++) {
        // have been calculated before
        if (existNote.indexOf(cart[dishes[i].name][j]) !== -1) continue;
        let thisNoteNum = 0;
        for (let k = 0; k < cart[dishes[i].name].length; k++) {
          if (cart[dishes[i].name][j] === cart[dishes[i].name][k])
            thisNoteNum += 1;
        }
        dishesNumTemp.push(thisNoteNum);
        existNote.push(cart[dishes[i].name][j]);
        // index 0 : the info of this dish, including name, ime, etc
        // index 1 : the note of this dish
        cartForMapTemp.push([dishes[i], cart[dishes[i].name][j]]);
      }
    }
    setCartForMap(cartForMapTemp);
    setDishesNum(dishesNumTemp);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 60,
          boxShadow: 2,
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
      <div className="my-auto relative">
        {cartForMap.length > 0 ? (
          cartForMap.map((order, idx) => (
            <div className="my-auto relative">
              <GoodInCart
                key={order[0].name}
                name={order[0].name}
                image={order[0].img}
                note={order[1]}
                number={dishesNum[idx]}
                cart={cart}
                setCart={setCart}
              />{" "}
              <Divider />
            </div>
          ))
        ) : (
          <div className="text-2xl text-emerald-400 overline top-20 relative">
            購物車裡面沒東西喔~
          </div>
        )}
      </div>
      <Box sx={{ height: 80 }} />
      {cartForMap.length > 0 ? (
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 70, left: 12, zIndex: 101 }}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          送出訂單
        </Fab>
      ) : null}
    </>
  );
};

export default ShoppingCartPage;
