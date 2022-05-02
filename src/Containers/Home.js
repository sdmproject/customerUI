import { useState } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Restaurant";
import { Typography, Rating } from "@mui/material";

const Home = ({ resturants, setResturantID }) => {
  const [hintText, setHintText] = useState("Select ypur resturant");
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
        <img
          className="Homepage-Img"
          src={process.env.PUBLIC_URL + "/quickorder.jpeg"}
          alt="Background"
        />
      </div>
      <div>{hintText}</div>
      {resturants.length > 0 ? (
        <div key={0}>
          <Restaurant
            restaurant={resturants[0]}
            setResturantID={setResturantID}
            setHintText={setHintText}
          />
        </div>
      ) : null}
      {/* <div key={0}>
        <Restaurant
          restaurant={resturants[0]}
          setResturantID={setResturantID}
          setHintText={setHintText}
        />
      </div> */}
      {/* {resturants.map((item, idx) => (
        <div key={idx}>
          <Restaurant
            restaurant={item}
            setResturantID={setResturantID}
            setHintText={setHintText}
          />
        </div>
      ))} */}
      {/* <Typography component="legend">rate this resturant!</Typography> */}
      <div>rate this resturant!</div>
      <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        size="large"
      />
    </>
  );
};

export default Home;
