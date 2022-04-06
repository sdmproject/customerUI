import AnimateButton from "../Components/AnimateButton";
import { useState, useEffect } from "react";
import Tab from "../Components/Tab";
import Dish from "../Components/Dish";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import shuffle from "../Functions/Shuffle";

const Menu = ({ dishes, cart, setCart }) => {
  const [dishType, setDishType] = useState("");
  const [allTypeName, setAllTypeName] = useState([]);
  const [allTypeImage, setAllTypeImage] = useState([]);

  useEffect(() => {
    shuffle(dishes);
    // because the state variable wouldn't render immediately
    let typeTemp = [];
    for (let i = 0; i < dishes.length; i++) {
      if (!typeTemp.includes(dishes[i].type)) {
        // setAllTypeName(all => [...all, dishes[i].type])
        typeTemp.push(dishes[i].type);
        setAllTypeImage((all) => [...all, dishes[i].image]);
      }
    }
    setAllTypeName(typeTemp);
  }, []);

  const onClick_dishType = (e, type) => {
    setDishType(type);
  };

  return (
    <Box>
      {dishType === "" ? (
        allTypeName.map((type, index) => (
          <div
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
          {/* {dishes.map(
				(dish)=>  dish.type === dishType
							?
							<div className={"button-object"}><AnimateButton imageUrl={dish.image} imageTitle={dish.name} imageWidth={"100%"}></AnimateButton></div>
							:
							<></>)} */}

          {/* <div className={"button-object"}>
            {" "} */}
          <Box sx={{ paddingTop: 6, width: 350 }}>
            <AnimateButton
              imageUrl={allTypeImage[allTypeName.indexOf(dishType)]}
              imageTitle={dishType}
              imageWidth={"100%"}
              clickAble="false"
            ></AnimateButton>
            {/* </div> */}
            {/* <br /> */}
            {dishes.map((dish) =>
              dish.type === dishType ? (
                // <div className={"my-auto inline-block p-3"}>
                <Dish dish={dish} cart={cart} setCart={setCart}></Dish>
              ) : // </div>
              null
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Menu;
