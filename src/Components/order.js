import {useState, useEffect} from "react"
import Divider from '@mui/material/Divider';
import {getTradeResult, sendOrderApi} from "../Functions/api"

const getTotalPrice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};




const Order = ({order, index,orders}) => {

	const [open, setOpen]  = useState("is-section")
	const [totalPrice, setTotalPrice] = useState(0)
	const [linePayUrl, setLinePayUrl] = useState("")
	const [havePayed, setHavePayed] = useState(false)
	useEffect(() => {
		setTotalPrice(getTotalPrice(order.cart))
		setLinePayUrl(order.linePayUrl)
		setHavePayed(order.havePayed)
	}, []);
  useEffect(() => {
    let interval
	if(havePayed){
      interval = setInterval( async() => {
        let temp = orders
        const tradeStatus = await getTradeResult(order["rec_trade_id"])

		if (tradeStatus.data.trade_history[0]["action"] !== 4){
			setHavePayed(true)
			sendOrderApi(order["cart"])
			let i = temp.findIndex(x => x === order)
			temp[i]["havePayed"] = true
			temp[i]["expire"] += 86400 * 1000
			// localStorage.setItem('orders', JSON.stringify(temp));
		}
            
    	}, 5000); 
	}

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, [havePayed]);



	const onClickOpen = () => {
		if (open === "is-section"){
			setOpen("is-active")
		}
		else {
			setOpen("is-section")
		}
	}
	const onClickOpenLinePay = () =>{
		const newWindow = window.open(linePayUrl, "_blank");
	}

	return (
		<div style={{"margin":"auto", "marginBottom":"40px", "marginTop":"30px", "marginLeft":"40px"}} onClick={onClickOpen} >
			<div style={{"display":"flex"}}>
				<div style={{"size":"20px", "fontWeight":"500", "marginRight":"100px"}}># {index}</div>
				<div  style={{"marginRight":"300px"}}> $ {totalPrice}</div>
				{havePayed
				?
					<button class="ts-button is-disabled">您已付款</button>		
				:
				<div onClick={onClickOpenLinePay}>
					<button class="ts-button" >使用LinePay付款</button>		
				</div>
				}
			</div>
		<div class={`ts-accordion ${open}`}>
			<div class="title">訂單詳細內容</div>
			{<div class="content" style={{"backgroundColor":"#DDDDDD", "padding":"20px"}}>{order.cart.map((good) => <div>{good.name} X {good.dishesNum}</div>)}</div>}
		</div>
		<Divider style={{"marginTop":"40px"}}/>
		</div>
	)
}


export default Order