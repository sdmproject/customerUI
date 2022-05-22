import { useState } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Restaurant";
import { FormattedMessage } from "react-intl";
import { ReactSession } from 'react-client-session';


const Home = ({ resturants, setResturantID }) => {
  const [hintText, setHintText] = useState("Select ypur resturant");
  const [ratingValue, setRatingValue] = useState(3);
  const [isTakeOut, setIsTakeOut] = useState(ReactSession.get("isTakeOut"));


  console.log(resturants);

  const switchTakeOut = () => {

    var current = ReactSession.get("isTakeOut");
    // console.log(`local is ${isTakeOut},global is ${current}`);
    setIsTakeOut(prev => !prev);
    ReactSession.set("isTakeOut", !current);
  }
  return (
    <>
      <div style={{ alignItems: "center" }}>
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
          <FormattedMessage id="bottomnav.home" defaultMessage="Restaurant" />
        </Box>

        <div className="img-containe">
          <img
            className="Homepage-Img"
            src={process.env.PUBLIC_URL + "/quickorder.jpeg"}
            alt="Background"
          />
        </div>
        <div class="ts-space" />
        <div className="ts-center">

          <div class="ts-box is-elevated" style={{ margin: "10px", maxWidth: "500px" }}>
            <div class="ts-space" />
            <div className="ts-row is-center-aligned">
              <div className="ts-wrap">
                <div class="column">
                  <label class="ts-switch is-large">
                    中文
                    <input type="checkbox" />
                    English
                  </label>
                </div>
                <div class="column">
                  <label class="ts-switch is-large" >
                    外帶
                    <input type="checkbox" onClick={switchTakeOut} />
                    內用
                  </label>
                </div>
              </div>
            </div>
            <div class="ts-space" />


            <label>
              大約
              <div class="ts-select is-small is-dense">
                <select>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>30</option>
                  <option>45</option>
                </select>
              </div>
              分鐘後到餐廳取餐
            </label>
            {
              //內用
              !isTakeOut ? (
                <label>
                  ，內用人數
                  <div class="ts-select is-small is-dense">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  人
                </label>

              ) : null
            }

            <div className="ts-grid">
              <div className="column is-1-wide"></div>
              <div className="column is-14-wide" style={{ alignItems: "center" }}>
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
              <div className="column is-1-wide"></div>
            </div>
            <div class="ts-space" />
          </div>
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
        {/* <div>rate this resturant!</div> */}
        {/* <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        size="large"
      /> */}
        <div className="ts-space"></div>
        <div className="ts-grid">
          <div className="column is-2-wide"></div>
          <div className="column is-12-wide">
            <div className="ts-center">
              <div className="ts-box">
                <div className="ts-content is-padded">
                  <div className="ts-quote is-heading ">
                    高品質肉的沃土，消費者的餐桌之家。
                    <div className="cite">
                      Meat
                      Place開業於二零一二年夏天。本店主要經營中式特色川菜。我們的川菜款式新穎，制材豐富，又不失傳統味道，開業至今一直受到廣大賓客的喜愛及好評。除此以外，我們也提供各式酒水配搭。餐廳環境優美衛生，更有充足停車位供應。我們將準備好美味的食物和優質的服務等待您的光臨！
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-2-wide"></div>
        </div>
        <Box sx={{ height: 80 }} />
      </div>
    </>
  );
};

export default Home;
