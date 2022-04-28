import axios from "axios";
import { nanoid } from "nanoid";

const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);
const payment = (item) => axios.post("http://localhost:4000/" + "payment", item);
// var orderid = 0;
const table = "7A";
const gettotalprice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};



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


  try {
    // orderid += 1;
    let date = new Date(); // Or the date you'd like converted.
    let isoDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1);
    const { data } = await createitem(`https://api.eatba.tk/order`, {
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
        };
      }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendPrime = async  (cart) => {
  try {
    let prime =""
    window.TPDirect.linePay.getPrime(async (result)=> {
      prime = result.prime
      console.log(prime)
      const { data } = await payment({prime:prime, cart:cart});
      console.log(data)
      return data;
    })  
  } catch (error) {
    console.log(error);
  }
};

// export const sendPrime = async (prime, cart) => {
//   let details = ""
//   for (let i = 0; i < cart.length; i++){
//     details += cart[i].name + " X " + cart[i].dishesNum + "\n" 
//   }

//   const post_data = {
//       // prime from front-end
//       "prime": prime,
//       "partner_key": process.env.PARENT_KEY,
//       "merchant_id": process.env.MERCHANT_ID,
//       // 金額
//       "amount": gettotalprice(cart),
//       "currency": "TWD",
//       "details": details,
//       // 會員可以打這些資訊
//       "cardholder": {
//           "phone_number": "+886923456789",
//           "name": "hello",
//           "email": "example@gmail.com"
//       },
//       // 分期付款
//       "instalment": 0,
//       "remember": false
//   }
//   const { data } = await axios.post("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", post_data, {
//     headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': process.env.X_API_KEY
//     }
//   });
//   return data
// }