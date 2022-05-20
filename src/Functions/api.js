import axios from "axios";
import { nanoid } from "nanoid";
import { ReactSession } from 'react-client-session';

const baseUrl = "https://49e6-150-117-240-26.ngrok.io";
// const baseUrl = "https://api.eatba.tk";
const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);
const payment = (item) => axios.post(`${baseUrl}/` + "payment", item);
// var orderid = 0;
const table = "7A";
const gettotalprice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};

export const getMenuApi = async (resturantID) => {
  try {
    const { data } = await getitems(`${baseUrl}/menu/${resturantID}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getResturantsApi = async () => {
  try {
    const { data } = await getitems(`${baseUrl}/restaurants`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderApi = async (cart) => {
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
    )
      .toISOString()
      .slice(0, -1);
    const { data } = await createitem(`${baseUrl}/order`, {
      id: nanoid(),
      tableNo: table,
      totalPrice: gettotalprice(cart),
      time: isoDateTime,
      items: cart.map((e) => {
        return {
          id: e.id,
          name: e.name,
          price: e.price,
          quantity: e.dishesNum,
          note: e.customization,
          status: "RAW",
          // googleID: ReactSession.get("google_ID"),
          // name: ReactSession.get("username"),
          // takeOut: true,
        };
      }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendPrime = async (cart) => {
  try {
    let prime = "";
    var data;
    window.TPDirect.linePay.getPrime(async (result) => {
      prime = result.prime;
      data = await payment({ prime: prime, cart: cart });
      console.log(data);
      window.payment = data;
    });
    return window.payment;
  } catch (error) {
    console.log(error);
  }
};

export const sendComment = async (commentInfo) => {
  var tmpApi = "https://49e6-150-117-240-26.ngrok.io";
  try {
    console.log("session name", ReactSession.get("username"));
    let date = new Date(); // Or the date you'd like converted.
    let isoDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    console.log('into send comment');
    console.log(isoDateTime);
    console.log(commentInfo);
    const { data } = await createitem(`${tmpApi}/comment`, {
      // const { data } = await createitem(`${baseUrl}/order`, {
      itemId: commentInfo.itemId,
      name: ReactSession.get("username"),
      content: commentInfo.content,
      time: isoDateTime,
      rate: commentInfo.rate,
      imgUrl: ReactSession.get("image_URL"),

    });

  }
  catch (error) {
    console.log(error);
  }
};