import { useState, useEffect } from "react";
import NumberSelector from "./NumberSelector";
import {
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
const GoodInCart = ({ name, image, note, number, cart, setCart }) => {
  const [dishNum, setDishNum] = useState(number);

  const onClick_Change = () => {
    let temp = cart;
    console.log(dishNum);
    console.log(number);
    let changeNum = dishNum - number >= 0 ? dishNum - number : number - dishNum;
    try {
      // minus
      if (dishNum - number < 0)
        for (let i = 0; i < changeNum; i++) {
          let removeIdx = temp[name].indexOf(note);
          if (removeIdx !== -1) temp[name].splice(removeIdx, 1);
        }
      //add
      else if (dishNum + number > 0)
        for (let i = 0; i < changeNum; i++) {
          temp[name].push(note);
        }
      setCart(temp);
      console.log(cart);
    } catch (e) {
      console.log("There is some error in removing");
    }
  };

  return (
    <Card sx={{ width: 350, height: "auto", marginTop: 2, display: "flex" }}>
      <CardMedia
        sx={{ position: "relative", width: 140 }}
        component="img"
        alt="圖片尚未準備"
        image={image}
      />
      <CardContent sx={{ position: "relative", flex: "1 0 auto", width: 210 }}>
        <Typography color="text.secondary">{name}</Typography>
        <Typography color="text.secondary">{note}</Typography>
        <NumberSelector
          dishNum={dishNum}
          setDishNum={setDishNum}
          Size="notsmall"
        ></NumberSelector>
        <Button onClick={onClick_Change} variant="contained" size="small">
          更改為此數量
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoodInCart;
