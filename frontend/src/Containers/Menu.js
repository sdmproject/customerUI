import AnimateButton from "../Components/AnimateButton";
import { useState, useEffect } from "react";
import Tab from "../Components/Tab";
import Dish from "../Components/Dish";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import shuffle from "../Functions/Shuffle";
// import getRedirectUrl from "../Functions/Test";

const Menu = ({ dishes, cart, setCart }) => {
  const [dishType, setDishType] = useState("");
  const [allTypeName, setAllTypeName] = useState([]);
  const [allTypeImage, setAllTypeImage] = useState([]);

  useEffect(() => {
    shuffle(dishes);
    let typeTemp = [];
    for (let i = 0; i < dishes.length; i++) {
      if (!typeTemp.includes(dishes[i].type)) {
        typeTemp.push(dishes[i].type);
        setAllTypeImage((all) => [...all, dishes[i].img]);
      }
    }
    setAllTypeName(typeTemp);
  }, [dishes]);

  const onClick_dishType = (e, type) => {
    setDishType(type);
  };

  return (
    <Box>
      {dishType === "" ? (
        allTypeName.map((type, index) => (
          <div
            key={index} //if not => Warning: Each child in a list should have a unique "key" prop.
            className={"button-object"}
            onClick={(e) => onClick_dishType(e, type)}
          >
            <AnimateButton
              imageUrl={allTypeImage[index]}
              imageTitle={type}
              imageWidth={"100%"}
            ></AnimateButton>
          </div>
        ))
      ) : (
        <Box>
          <Tab
            items={allTypeName}
            dishType={dishType}
            setDishType={setDishType}
          />
          <Box sx={{ paddingTop: 6 }}>
            <AnimateButton
              imageUrl={allTypeImage[allTypeName.indexOf(dishType)]}
              imageTitle={dishType}
              imageWidth={"100%"}
              clickAble="false"
            ></AnimateButton>
            {dishes.map((dish) =>
              dish.type === dishType ? (
                <Dish
                  key={dish.name}
                  dish={dish}
                  cart={cart}
                  setCart={setCart}
                />
              ) : null
            )}
            <Box sx={{ height: 80 }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Menu;
