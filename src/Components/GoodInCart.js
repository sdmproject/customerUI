import { useState, useEffect } from "react";
import NumberSelector from "./NumberSelector";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
const GoodInCart = ({ index, name, image, note, number, cart, setCart }) => {
  const [dishNum, setDishNum] = useState(number);

  useEffect(() => {
    // if (dishNum > 0) {
    let items = [...cart];
    let item = { ...items[index], dishesNum: dishNum };
    items[index] = item;
    setCart(items);
    // } else {
    //   setCart((cart) => cart.filter((_, idx) => idx !== index));
    // }
  }, [dishNum]);

  return (
    <Card
      sx={{
        width: "100%",
        height: note.length > 0 ? 150 : 100,
        marginTop: 2,
        display: "flex",
      }}
    >
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
        />
      </CardContent>
    </Card>
  );
};

export default GoodInCart;
