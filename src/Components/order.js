import {useState, useEffect} from "react"
import Divider from '@mui/material/Divider';
import {getTradeResult, sendOrderApi} from "../Functions/api"
import { FormattedMessage } from "react-intl";
import mixpanel from "mixpanel-browser"

const getTotalPrice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};




const Order = ({order, index, forceOrderUpdate, setForceOrderUpdate, orders, setOrders}) => {
	

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
	if(!havePayed){
	interval = setInterval( async() => {
	// console.log(orders)
	if(!havePayed){
		const tradeStatus = await getTradeResult(order["rec_trade_id"])
		// console.log(orders)
		for (let i = 0; i < tradeStatus.data.trade_history.length; i ++){
			
			if (tradeStatus.data.trade_history[i]["action"] == 0 || tradeStatus.data.trade_history[i]["action"] == 1){
				setHavePayed(true)
				sendOrderApi(order["cart"])
				let events = {
					"rec_trade_id":order.rec_trade_id,
					"total price": getTotalPrice(order.cart)
				}
				for (let i = 0; i < order.cart.length; i++){
					events[order.cart[i].name] = order.cart[i].dishesNum
				}
				mixpanel.track("payment", events)
				setForceOrderUpdate(forceOrderUpdate + 1)
				// end the interval
				console.log(`clearing interval`);
				if(orders){
					let idx = orders.findIndex( x=> x === order)
					setOrders([...orders.slice(0,idx), ...orders.slice(idx+1)])
				}
				clearInterval(interval);
				break
			}
			}   
	}}, 3000);} 

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, []);



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
		<>
		{havePayed === true
		?
		<></>
		:
		<>
		<div style={{"margin":"auto", "marginBottom":"40px", "marginTop":"30px", "marginLeft":"40px"}} onClick={onClickOpen} >
			<div style={{"display":"flex"}}>
				<div>
					<div style={{"fontSize":"20px", "fontWeight":"500"}}>          
					<FormattedMessage
            		id="order.toPay"
            		defaultMessage="待付款訂單# "/>
					{index + 1}</div>
					<div  style={{"fontSize":"20px"}}>
					<FormattedMessage
            		id="order.amount"
            		defaultMessage="訂單金額 $ "/>
					 {totalPrice}</div>
				</div>
				{havePayed
				?
					<button class="ts-button is-disabled" style={{"marginLeft":"20%"}}> 					
					<FormattedMessage
            		id="order.havePayed"
            		defaultMessage="此訂單已付款 "/>
					</button>		
				:
				<div onClick={onClickOpenLinePay}>
					<button class="ts-button" style={{"marginLeft":"20%"}}>
					<FormattedMessage
            		id="order.payWithLinePay"
            		defaultMessage="使用LinePay付款 "/>
					</button>		
				</div>
				}
			</div>
		<Divider style={{"margin":"20px" }}/>
		<div class={`ts-accordion ${open}`}>
			<div class="title"  style={{"fontSize":"20px"}}>
					<FormattedMessage
            		id="order.details"
            		defaultMessage="訂單詳細內容"/>
			</div>
			{/* {<div class="content" style={{"backgroundColor":"#DDDDDD", "padding":"50px", "fontSize":"25px"}}>{historyOrder.items.map((good) => <div>{good.name} X {good.orderItemInfo.quantity} 的備餐狀態 : {good.orderItemInfo.state}</div>)}</div>} */}
			{<div class="content" style={{"backgroundColor":"#DDDDDD", "padding":"50px", "fontSize":"25px"}}>{order.cart.map((good) => <div>{good.name} X {good.dishesNum}</div>)}</div>}
		</div>
		<Divider style={{"marginTop":"40px"}}/>
		</div>
		</>	
		}
		</>
	)
}


export default Order