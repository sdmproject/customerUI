import AnimateButton from "../Components/AnimateButton";
import { useState, useEffect } from "react";
import Tab from "../Components/Tab";
import Dish from "../Components/Dish";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
// import { Divider } from "@mui/material";
import shuffle from "../Functions/Shuffle";
// import getRedirectUrl from "../Functions/Test";
import { ReactSession } from 'react-client-session';


const Menu = ({ dishes, cart, setCart, setDishes, lang, userName }) => {
  const [dishType, setDishType] = useState("");
  const [allTypeName, setAllTypeName] = useState([]);
  const [allTypeImage, setAllTypeImage] = useState([]);
  const [searchtext, setSearchtext] = useState("");

  useEffect(() => {
    shuffle(dishes);
    let typeTemp = [];
    for (let i = 0; i < dishes.length; i++) {
      if (!typeTemp.includes(dishes[i].type.toUpperCase())) {
        typeTemp.push(dishes[i].type.toUpperCase());
        setAllTypeImage((all) => [...all, dishes[i].img]);
      }
    }
    // console.log(typeTemp);
    setAllTypeName(typeTemp);
    // console.log("user info :",
    //   ReactSession.get("username"),
    //   ReactSession.get("image_URL"),
    //   ReactSession.get("email"),
    //   ReactSession.get("google_ID")
    // );

  }, [dishes]);

  const onClick_dishType = (e, index) => {
    setDishType(index);
  };

  const handleChange = (event) => {
    setSearchtext(event.target.value);
  };

  return (
    <Box>
      {dishType === "" ? (
        allTypeName.map((type, index) => (
          <div
            key={index} //if not => Warning: Each child in a list should have a unique "key" prop.
            className={"button-object"}
            onClick={(e) => onClick_dishType(e, index)}
          >
            <AnimateButton
              imageUrl={allTypeImage[index]}
              imageTitle={type}
              imageWidth={"100%"}
            />
          </div>
        ))
      ) : (
        <Box>
          <Tab
            items={allTypeName}
            dishType={dishType}
            setDishType={setDishType}
            lang={lang}
          />
          <Box sx={{ paddingTop: 6 }}>
            <AnimateButton
              imageUrl={allTypeImage[dishType]}
              imageTitle={allTypeName[dishType]}
              imageWidth={"100%"}
              clickAble="false"
            />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              color="primary"
              label="Search"
              value={searchtext}
              onChange={handleChange}
            />
            {searchtext === null || searchtext.match(/^ *$/) !== null
              ? dishes.map((dish) =>
                dish.type.toUpperCase() === allTypeName[dishType] ? (
                  <Dish
                    // key={dish.name}
                    dish={dish}
                    cart={cart}
                    setCart={setCart}
                    setDishes={setDishes}
                    userName={userName}
                  />
                ) : null
              )
              : dishes
                .filter((item) =>
                  item.name.toLowerCase().includes(searchtext.toLowerCase())
                )
                .map((dish) =>
                  dish.type.toUpperCase() === allTypeName[dishType] ? (
                    <Dish
                      // key={dish.name}
                      dish={dish}
                      cart={cart}
                      setCart={setCart}
                      setDishes={setDishes}
                      userName={userName}
                    />
                  ) : null
                )}
          </Box>
          <Box sx={{ height: 80 }} />
        </Box>
      )}
    </Box>
  );
};

export default Menu;
