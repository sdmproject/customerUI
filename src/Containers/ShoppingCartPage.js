import { useEffect } from "react";
import GoodInCart from "../Components/GoodInCart";
import { Box, Fab, Alert, AlertTitle, Backdrop } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import NavigationIcon from "@mui/icons-material/Navigation";
import { FormattedMessage } from "react-intl";

const ShoppingCartPage = ({
  cart,
  setCart,
  sendorder,
  showAlert,
  setShowAlert,
}) => {
  const gettotalprice = () => {
    let sum = 0;
    cart.map((obj) => {
      sum += obj.price * obj.dishesNum;
      return null;
    });
    return sum;
  };
  const closealert = () => {
    setShowAlert(null);
    setCart([]);
  };

  useEffect(() => {
    if (!cart.every((e) => e.dishesNum > 0)) {
      setCart((cart) => cart.filter((item) => item.dishesNum > 0));
    }
  }, [cart]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 60,
          boxShadow: 2,
          position: "fixed",
          top: 0,
          zIndex: 100,
          backgroundColor: "primary.main",
          color: "primary.text",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShoppingCart color="primary.text" sx={{ position: "relative" }} />
        <FormattedMessage id="bottomnav.cart" defaultMessage="Cart" />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 60,
          boxShadow: 1,
          position: "fixed",
          top: 60,
          zIndex: 100,
          backgroundColor: "white",
          color: "primary.text",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Total ${gettotalprice(cart)}
      </Box>
      <Box sx={{ height: 120 }} />
      {cart.length > 0 ? (
        cart.map((obj, idx) =>
          obj.dishesNum > 0 ? (
            <GoodInCart
              key={idx}
              index={idx}
              name={obj.name}
              image={obj.img}
              note={obj.customization}
              number={obj.dishesNum}
              cart={cart}
              setCart={setCart}
            />
          ) : null
        )
      ) : (
        <div className="text-2xl text-emerald-400 overline top-20 relative">
          <FormattedMessage
            id="cart.empty"
            defaultMessage="購物車裡面沒東西喔~"
          />
        </div>
      )}
      {showAlert && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showAlert === "success" ? true : false}
        >
          <Alert
            severity={showAlert === "success" ? "success" : "error"}
            onClose={() => closealert()}
            sx={{ position: "relative", opacity: 1 }}
          >
            <AlertTitle>
              {showAlert === "success" ? "Success" : "Error"}
            </AlertTitle>
            {showAlert === "success" ? (
              <AlertTitle>
                <FormattedMessage
                  id="cart.alert.choose"
                  defaultMessage="已送出訂單，請選擇：~"
                />
              </AlertTitle>
            ) : (
              <AlertTitle>
                <FormattedMessage
                  id="cart.alert.failed"
                  defaultMessage="請稍後重試~"
                />
              </AlertTitle>
            )}
            {showAlert === "success" ? (
              <AlertTitle>
                <FormattedMessage
                  id="cart.alert.linepay"
                  defaultMessage="1.三秒後在畫面正下方會生成一個按鈕，十分鐘內，利用此按鈕付款，付款後會立即出餐~"
                />
              </AlertTitle>
            ) : (
              <></>
            )}
            {showAlert === "success" ? (
              <AlertTitle>
                <FormattedMessage
                  id="cart.alert.pay"
                  defaultMessage="2.於櫃檯付款，付款後會立即出餐~"
                />
              </AlertTitle>
            ) : (
              <></>
            )}
          </Alert>
        </Backdrop>
      )}
      <Box sx={{ height: 80 }} />
      {cart.length > 0 ? (
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 70, right: 12, zIndex: 101 }}
          onClick={sendorder}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          <FormattedMessage id="cart.sendorder" defaultMessage="送出訂單" />
        </Fab>
      ) : null}
    </>
  );
};

export default ShoppingCartPage;
