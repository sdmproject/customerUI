import axios from "axios";
import { nanoid } from "nanoid";
import { ReactSession } from 'react-client-session';

const baseUrl = "https://49e6-150-117-240-26.ngrok.io";
// const baseUrl = "https://api.eatba.tk";
// const baseUrl = "https://api.eatba.tk";
const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);
const payment = (item) => axios.post(`${baseUrl}/` + "payment", item);
const tradeHistory = (item) => axios.post(`${baseUrl}/tradeHistory`, item )
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
    let nowDate = new Date(); // Or the date you'd like converted.
    let nowDateUTC8 = new Date(nowDate.getTime() - nowDate.getTimezoneOffset() * 60000);
    let isoNowTime = nowDateUTC8.toISOString().slice(0, -1);

    let durationInMinutes = ReactSession.get("minutesLater");
    let arrivedTime = new Date(nowDateUTC8.getTime() + durationInMinutes * 60000);
    let isoArrivedTime = arrivedTime.toISOString().slice(0, -1);

    const { data } = await createitem(`${baseUrl}/order`, {
      id: nanoid(),
      tableNo: table,
      totalPrice: gettotalprice(cart),
      time: isoNowTime,
      customerId: ReactSession.get("google_ID"),
      customerName: ReactSession.get("username"),
      isTakeOut: ReactSession.get("isTakeOut").toString(),
      arrivedTime: isoArrivedTime,
      herePeople: ReactSession.get("herePeople"),
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
    console.log("sendOrderApi", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getPrime = () => {
//   window.TPDirect.linePay.getPrime((result) => {
//     let prime = result.prime;
//     console.log(prime)
//     window.prime = prime;
//   });  
// }

// export const sendPrime = async (prime, cart) => {
//   let data = await payment({ prime: prime, cart: cart });

//   window.payment = data;
//   return data;
// } 



export const sendPrime = async (cart) => {
  try {
    let prime = "";
    var data;
    window.TPDirect.linePay.getPrime(async (result) => {
      prime = result.prime;
      data = await payment({ prime: prime, cart: cart });
      window.payment = data;
    });
    return window.payment;
  } catch (error) {
    console.log(error);
  }
};


export const getTradeResult = async (trade_id) => {
  const tradeResult = await tradeHistory({ trade_id: trade_id });
  // console.log(tradeResult)
  return tradeResult
}


export const test = async() => {
  const data = await createitem(`${baseUrl}/orderById`, {
      "customerId":"customerId"
    });
  console.log(data)
}
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
