import axios from "axios";

const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);
var orderid = 0;
const table = "7A";

export const getMenuData = async (resturantID) => {
  try {
    const { data } = await getitems(`https://api.eatba.tk/menu/${resturantID}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNearbyResturants = async () => {
  try {
    const { data } = await getitems(`https://api.eatba.tk/restaurants`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrder = async (cart) => {
  orderid += 1;
  const gettotalprice = () => {
    let sum = 0;
    cart.map((obj) => {
      sum += obj.price * obj.dishesNum;
    });
    return sum;
  };
  try {
    const { data } = await createitem(`https://api.eatba.tk/order`, {
      id: `order${orderid}`,
      tableNo: table,
      totalPrice: gettotalprice(),
      time: new Date().toISOString(),
      items: cart.map((e) => {
        return {
          id: e.id,
          name: e.name,
          price: e.price,
          quantity: e.dishesNum,
          note: e.customization,
          status: "RAW",
        };
      }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
