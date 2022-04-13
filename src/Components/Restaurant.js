import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Restaurant = ({ restaurant, setResturantID, setHintText }) => {
  let navigate = useNavigate();
  const onClick_chooseResturant = () => {
    setResturantID(restaurant.id);
    setHintText(`you are choosing "${restaurant.name}"`);
    navigate("../menu", { replace: true });
  };

  return (
    <>
      <Card sx={{ width: "100%", height: 100, marginTop: 2, display: "flex" }}>
        <CardActionArea
          sx={{ display: "flex" }}
          component={Button}
          onClick={onClick_chooseResturant}
        >
          <CardMedia
            sx={{ position: "relative", width: "40%" }}
            component="img"
            alt="圖片尚未準備"
            image={restaurant.img}
          />
          <CardContent
            sx={{ position: "relative", flex: "1 0 auto", width: "60%" }}
          >
            <Typography
              style={{ fontFamily: "NotoSansTC" }}
              color="text.secondary"
            >
              {restaurant.name}
            </Typography>
            <Typography color="text.secondary">
              {restaurant.rates_ave}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Restaurant;
