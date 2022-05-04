import { useState } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Restaurant";
import { Typography, Rating } from "@mui/material";

const Home = ({ resturants, setResturantID }) => {
  const [hintText, setHintText] = useState("Select ypur resturant");
  const [ratingValue, setRatingValue] = useState(3);

  console.log(resturants);
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
      {/* <div>{hintText}</div> */}
      <div class="ts-grid">
        <div class="column is-1-wide"></div>
        <div class="column is-14-wide">
          {resturants.length > 0 ? (
            <div key={0}>
              <Restaurant
                restaurant={resturants[0]}
                setResturantID={setResturantID}
                setHintText={setHintText}
              />
            </div>
          ) : null}
        </div>
        <div class="column is-1-wide"></div>

      </div>
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
      {/* <div class="ts-space is-small"></div> */}
      <div class="ts-grid">
        <div class="column is-2-wide"></div>
        <div class="column is-12-wide">
          <div class="ts-center">
            <div class="ts-box">
              <div class="ts-content is-padded">
                <div class="ts-quote is-heading ">
                  高品質肉的沃土，消費者的餐桌之家。

                  <div class="cite">meat place開業於二零一二年夏天。本店主要經營中式特色川菜。我們的川菜款式新穎，制材豐富，又不失傳統味道，開業至今一直受到廣大賓客的喜愛及好評。除此以外，我們也提供各式酒水配搭。餐廳環境優美衛生，更有充足停車位供應。我們將準備好美味的食物和優質的服務等待您的光臨！</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-2-wide"></div>
      </div>
    </>
  );
};

export default Home;
