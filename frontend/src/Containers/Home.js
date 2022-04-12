import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Resturant";
import { Typography, Rating } from "@mui/material";






const Home = ({ resturants, resturantID, setResturantID }) => {
    // const [hintText, setHintText] = useState("Select ypur resturant");
    const [hintText, setHintText] = useState("Welcome to the quick order!");
    const [ratingValue, setRatingValue] = useState(3);

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
                <HomeIcon color="primary.text" sx={{ position: "relative" }} />
                Home
            </Box>

            <div className="img-containe">
                {/* <div className="Homepage-Img" > */}
                <img className="Homepage-Img" src={'quickorder.jpeg'} alt="Background" />
                {/* </div> */}
            </div>
            <div>
                {hintText}
            </div>

            {
                resturants.map((item, idx) => (

                    item.id == resturantID ? (
                        <>
                            <div key={idx}>
                                {/* <Restaurant restaurant={item} setResturantID={setResturantID} setHintText={setHintText} /> */}
                                <Restaurant restaurant={item} setResturantID={() => { }} setHintText={() => { }} />
                            </div>

                            <Typography style={{ fontFamily: "NotoSansTC" }} component="legend">{item.description}</Typography>
                            <div style={{ height: 100 }} />
                            {/* <Typography component="legend">{item.address}</Typography> */}
                        </>
                    )
                        : null
                ))

            }
            <Typography component="legend">rate this resturant!</Typography>

            <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                    setRatingValue(newValue);
                }}
                size="large"
            />

        </ >


    );

}

export default Home;