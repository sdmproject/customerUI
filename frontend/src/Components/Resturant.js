import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";




const Restaurant = ({ restaurant }) => {


    return (
        <>
            <Card sx={{ width: "100%", height: 100, marginTop: 2, display: "flex" }}>
                <CardActionArea
                    sx={{ display: "flex" }}
                    component={Button}
                // onClick={onClick_open}
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
                        <Typography color="text.secondary">{restaurant.name}</Typography>
                        <Typography color="text.secondary">{restaurant.rates_ave}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default Restaurant;
