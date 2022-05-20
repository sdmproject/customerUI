import axios from "axios";
import { nanoid } from "nanoid";

// const baseUrl = "https://api.eatba.tk";
// const baseUrl = "https://api.eatba.tk";
const baseUrl = "https://49e6-150-117-240-26.ngrok.io"
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
        };
      }),
    });
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
  console.log(tradeResult)
  return tradeResult
}


// app.post("/trade_history", async (req, res) => {
//   const trade_id = req.body.trade_id

//   const tradeResult = await axios.post('https://sandbox.tappaysdk.com/tpc/transaction/trade-history',
//    {
//     "partner_key": "partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL",
//     "rec_trade_id": trade_id
//     },
//     {
//     headers: {
//     'Content-Type': 'application/json',
//     'x-api-key': "partner_wcxH5GX2HMLk9p2WpfOYSWseWOyn0mE0K1VwqjIZAgDGCsRZ4BEqMCaL"
//     }
//     }
//   )

//   return tradeResult
// })
