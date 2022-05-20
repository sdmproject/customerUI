import {useState} from "react"
import Order from "../Components/order"
import Box from '@mui/material/Box';


const OrdersPage = ({orders}) => {
	// const cart = {[]}

	return (
		<>
			{orders.map(((order,index) => <Order order={order} index={index} orders={orders}/> ))}
			<Box sx={{ height: 80 }} />
		</>
	) 
}

export default OrdersPage;