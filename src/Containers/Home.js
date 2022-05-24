import { useState } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Restaurant from "../Components/Restaurant";
import { FormattedMessage } from "react-intl";
import { ReactSession } from "react-client-session";

const Home = ({ resturants, setResturantID }) => {
  const [hintText, setHintText] = useState("Select ypur resturant");
  const [ratingValue, setRatingValue] = useState(3);
  const [isTakeOut, setIsTakeOut] = useState(ReactSession.get("isTakeOut"));

  // console.log(resturants);

  const switchTakeOut = () => {
    var current = ReactSession.get("isTakeOut");
    // console.log(`local is ${isTakeOut},global is ${current}`);
    if (!current) {
      ReactSession.set("herePeople", 1);
    }
    setIsTakeOut((prev) => !prev);
    ReactSession.set("isTakeOut", !current);
  };

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
        <div className="ts-space" />
        <div className="ts-center">
          <div
            className="ts-box is-elevated"
            style={{ margin: "10px", maxWidth: "500px" }}
          >
            <div className="ts-space" />
            <div className="ts-row is-center-aligned">
              <div className="ts-wrap">
                {/* <div className="column">
                  <label className="ts-switch is-large">
                    中文
                    <input type="checkbox" />
                    English
                  </label>
                </div> */}
                <div className="column">
                  <label className="ts-switch is-large">
                    <FormattedMessage id="home.takeout" defaultMessage="外帶" />
                    <input type="checkbox" onClick={switchTakeOut} />
                    <FormattedMessage id="home.inside" defaultMessage="內用" />
                  </label>
                </div>
              </div>
            </div>
            <div className="ts-space" />

            <label>
              <FormattedMessage id="home.approximate" defaultMessage="大約" />
              <div className="ts-select is-small is-dense">
                <select
                  defaultValue={15}
                  onChange={(e) =>
                    ReactSession.set("minutesLater", e.target.value)
                  }
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                </select>
              </div>
              <FormattedMessage
                id="home.getMeal"
                defaultMessage="分鐘後到餐廳取餐"
              />
            </label>
            {
              //內用
              !isTakeOut ? (
                <label>
                  <FormattedMessage
                    id="home.people1"
                    defaultMessage="，內用人數"
                  />

                  <div className="ts-select is-small is-dense">
                    <select
                      defaultValue={1}
                      onChange={(e) =>
                        ReactSession.set("herePeople", e.target.value)
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                  <FormattedMessage id="home.people2" defaultMessage="." />
                </label>
              ) : null
            }

            <div className="ts-grid">
              <div className="column is-1-wide"></div>
              <div
                className="column is-14-wide"
                style={{ alignItems: "center" }}
              >
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
            <div className="ts-space" />
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
                    <FormattedMessage
                      id="home.resturant.title"
                      defaultMessage="Order Now!"
                    />
                    <div className="cite">
                      <FormattedMessage
                        id="home.resturant.description"
                        defaultMessage="Good resturant don't wait."
                      />
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
