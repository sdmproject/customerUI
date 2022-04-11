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
    let changeNum = dishNum - number >= 0 ? dishNum - number : number - dishNum;
    try {
      if (dishNum - number < 0)
        for (let i = 0; i < changeNum; i++) {
          let removeIdx = temp[name].indexOf(note);
          if (removeIdx !== -1) temp[name].splice(removeIdx, 1);
        }
      else if (dishNum + number > 0)
        for (let i = 0; i < changeNum; i++) {
          temp[name].push(note);
        }
      setCart(temp);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ width: "100%", height: 150, marginTop: 2, display: "flex" }}>
      <CardMedia
        sx={{ position: "relative", width: "40%" }}
        component="img"
        alt="圖片尚未準備"
        image={image}
      />
      <CardContent
        sx={{ position: "relative", flex: "1 0 auto", width: "60%" }}
      >
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
