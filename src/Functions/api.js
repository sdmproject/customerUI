import axios from "axios";
import { nanoid } from "nanoid";

const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);
// var orderid = 0;
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
  const gettotalprice = () => {
    let sum = 0;
    cart.map((obj) => {
      sum += obj.price * obj.dishesNum;
    });
    return sum;
  };

  try {
    // orderid += 1;
    let date = new Date(); // Or the date you'd like converted.
    let isoDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    const { data } = await createitem(`https://api.eatba.tk/order`, {
      id: nanoid(),
      tableNo: table,
      totalPrice: gettotalprice(),
      time: isoDateTime,
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
