import {useState} from "react"
import Order from "../Components/order"
import Box from '@mui/material/Box';
import HistoryOrder from "../Components/HistoryOrder"
import Tab from "../Components/TabForOrder";

const OrdersPage = ({orders, historyOrders}) => {
	
	const [type, setType] = useState("待付款訂單")
	return (
		<>
		  <Box sx={{ height: 80 }}></Box>
		  <Tab
            items={["歷史訂單", "待付款訂單"]}
            type={type}
            setType={setType}
          />
			{type === "歷史訂單"
			?
				historyOrders.map(((historyOrder,index) => <HistoryOrder historyOrder={historyOrder} index={index}/>))
			:
				orders.map(((order,index) => <Order order={order} index={index}/> ))
			}
			<Box sx={{ height: 80 }} />
		</>
	) 
}

export default OrdersPage;