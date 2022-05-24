import {useState, useEffect} from "react"
import Divider from '@mui/material/Divider';
import {getTradeResult, sendOrderApi} from "../Functions/api"
import { FormattedMessage } from "react-intl";
import { SwitchRight } from "@mui/icons-material";
import { Circle } from '@mui/icons-material';
const getTotalPrice = (cart) => {
  let sum = 0;
  cart.map((obj) => {
    sum += obj.price * obj.dishesNum;
  });
  return sum;
};




const HistoryOrder = ({historyOrder, index, getOrderById, forceOrderUpdate, setHistoryOrders}) => {

	const [open, setOpen]  = useState("is-section")
	const [totalPrice, setTotalPrice] = useState(0)
	const [linePayUrl, setLinePayUrl] = useState("")
	const [havePayed, setHavePayed] = useState(false)
	const [status, setStatus] = useState(0)
	const [color, setColor] = useState("")
	useEffect(() => {
		setTotalPrice(historyOrder.totalPrice)
		setLinePayUrl("/")
		setHavePayed(true)
		let cnt_unready = 0;
		let cnt_preparing = 0;
		let cnt_ready = 0
		for (let i = 0; i < historyOrder.items.length; i++){
			switch(historyOrder.items[i].orderItemInfo.state){
				case "unready":
					cnt_unready += 1;	
					break
				case "preparing":
					cnt_preparing += 1;	
					break
				case "ready":
					cnt_ready += 1;	
					break
			}
		}
		if(cnt_unready > 0){
			setStatus("unready")
			setColor('rgba(248, 32, 34, 0.59)')
		}
		else if (cnt_preparing > 0){
			setStatus("preparing")
			setColor('rgba(245, 249, 0, 0.54)')
		}
		else{
			setStatus("ready")
			setColor('rgba(19,236,28,0.19)')
		}
	}, [historyOrder]);

	// useEffect(async() => {
		// const data = await getOrderById()
		// const {data} = await getOrderById();
    	// setHistoryOrders(data) 
	// }, [forceOrderUpdate]);


	const onClickOpen = () => {
		if (open === "is-section"){
			setOpen("is-active")
		}
		else {
			setOpen("is-section")
		}
	}

	return (
		<>
		<div style={{"margin":"auto", "marginBottom":"40px", "marginTop":"30px", "marginLeft":"40px"}} onClick={onClickOpen} >
			<div style={{"display":"flex"}}>
				<div>
					<div style={{"fontSize":"20px", "fontWeight":"500"}}>
					<FormattedMessage
            		id="order.historyOrder"
            		defaultMessage="歷史訂單 # "/>
					{index + 1}

					</div>
					<div  style={{"fontSize":"20px"}}>
					<FormattedMessage
            		id="order.amount"
            		defaultMessage="訂單金額 $ "/>
					{totalPrice}</div>
				</div>
				<Circle fontSize="large" style={{ color: color , "marginLeft":"20%", "marginTop":"10px"}} />
				{/* <button class="ts-button is-disabled" style={{"marginLeft":"20%"}}><FormattedMessage
            		id="order.havePayed"
            		defaultMessage="此訂單已付款 "/></button>		 */}
			</div>
		<Divider style={{"margin":"20px" }}/>
		<div class={`ts-accordion ${open}`}>
			<div class="title"  style={{"fontSize":"20px"}}><FormattedMessage
            		id="order.details"
            		defaultMessage="訂單詳細內容"/></div>
			{/* {<div class="content" style={{"backgroundColor":"#DDDDDD", "padding":"50px", "fontSize":"25px"}}>{historyOrder.items.map((good) => <div>{good.name} X {good.orderItemInfo.quantity} 的備餐狀態 : {good.orderItemInfo.state}</div>)}</div>} */}
			{<div class="content" style={{"backgroundColor":"#DDDDDD", "padding":"50px", "fontSize":"25px"}}>{historyOrder.items.map((good) => 
			<div>{good.name} X {good.orderItemInfo.quantity}
			{good.orderItemInfo.state === "unready"
			?
			<Circle fontSize="small" style={{ color: "rgba(248, 32, 34, 0.59)" , "marginLeft":"30px"}} />
			:
				good.orderItemInfo.state === "preparing"
				?
				<Circle fontSize="small" style={{ color: "rgba(245, 249, 0, 0.54)",  "marginLeft":"30px"}} />
				:
				<Circle fontSize="small" style={{ color:"rgba(19,236,28,0.19)" ,  "marginLeft":"30px"}} />
			}
			</div>)}
			
			</div>}
		</div>
		<Divider style={{"marginTop":"40px"}}/>
		</div>
		</>
	)
}


export default HistoryOrder