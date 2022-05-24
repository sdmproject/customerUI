import { useState } from "react"
import Order from "../Components/order"
import Box from '@mui/material/Box';
import HistoryOrder from "../Components/HistoryOrder"
import Tab from "../Components/TabForOrder";
import { FormattedMessage } from "react-intl";
// getOrderById={getOrderById} forceOrderUpdate={forceOrderUpdate} setForceOrderUpdate={setForceOrderUpdate}
const OrdersPage = ({ orders, setOrders, historyOrders, getOrderById, forceOrderUpdate, setForceOrderUpdate, setHistoryOrders }) => {
	const onClickRefresh = async () => {
		console.log('into onClickRefresh');
		const { data } = await getOrderById()
		setHistoryOrders(data)
		console.log(data)
	}
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
				<>

					{historyOrders.map(((historyOrder, index) => <HistoryOrder historyOrder={historyOrder} index={index} getOrderById={getOrderById} forceOrderUpdate={forceOrderUpdate} setHistoryOrders={setHistoryOrders} />))}
					<button class="ts-button" onClick={onClickRefresh}>
						{/* <button class="ts-button" style={{ "right": "5px", "bottom": "60px", position: "fixed", }} onClick={onClickRefresh}> */}
						<FormattedMessage
							id="order.refresh"
							defaultMessage="更新訂單狀態 " />
					</button>
				</>
				:
				orders.map(((order, index) => <Order order={order} orders={orders} setOrders={setOrders} index={index} forceOrderUpdate={forceOrderUpdate} setForceOrderUpdate={setForceOrderUpdate} />))
			}
			<Box sx={{ height: 80 }} />
		</>
	)
}

export default OrdersPage;