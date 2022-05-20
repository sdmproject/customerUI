import {useState} from "react"
import Divider from '@mui/material/Divider';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';


const url = 1;
const Order = ({order}) => {

	const [open, setOpen]  = useState("is-section")

	const onClickOpen = () => {
		if (open === "is-section"){
			setOpen("is-active")
		}
		else {
			setOpen("is-section")
		}
	}
	const onClickOpenLinePay = (event) =>{
		const newWindow = window.open(event.target.value, "_blank");
	}

	return (
		<div style={{"margin":"auto", "marginBottom":"40px"}} onClick={onClickOpen} >
			<div style={{"display":"flex"}}>
				<div style={{"marginRight":"300px"}}>
					<h1 style={{}}>order</h1>
					<div> $ 1254 </div>
				</div>
				<div onClick={onClickOpenLinePay} value={url}>
					<button class="ts-button" >使用LinePay付款</button>		
				</div>
			</div>
		<div class={`ts-accordion ${open}`}>
			<div class="title">營業時間為何？</div>
			<div class="content">每日的早上九點至晚上八點。</div>
		</div>
		<Divider style={{"marginTop":"40px"}}/>
		</div>
	)
}


export default Order