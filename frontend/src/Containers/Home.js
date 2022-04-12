import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Restaurant";

const Home = ({ resturants, setResturantID }) => {
  const [hintText, setHintText] = useState("Select ypur resturant");

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
          src={"/quickorder.jpeg"}
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
    </>
  );
};

export default Home;
