import GoodInCart from "../Components/GoodInCart"
import { useState, useEffect } from "react"
import Divider from '@mui/material/Divider';
const ShoppingCartPage = ({ dishes, cart, setCart }) => {

	const [dishesNum, setDishesNum] = useState([])
	const [cartForMap, setCartForMap] = useState([])

	useEffect(() => {
		let dishesNumTemp = []
		let cartForMapTemp = []
		for (let i = 0; i < dishes.length; i++) {
			let existNote = []
			for (let j = 0; j < cart[dishes[i].name].length; j++) {
				// have been calculated before
				if (existNote.indexOf(cart[dishes[i].name][j]) !== -1)
					continue
				let thisNoteNum = 0
				for (let k = 0; k < cart[dishes[i].name].length; k++) {
					if (cart[dishes[i].name][j] === cart[dishes[i].name][k])
						thisNoteNum += 1
				}
				dishesNumTemp.push(thisNoteNum)
				existNote.push(cart[dishes[i].name][j])
				// index 0 : the info of this dish, including name, ime, etc
				// index 1 : the note of this dish
				cartForMapTemp.push([dishes[i], cart[dishes[i].name][j]])
			}
		}
		setCartForMap(cartForMapTemp)
		setDishesNum(dishesNumTemp)
	}, [])

	return (
		<div className="my-auto top-40 relative">{
			cartForMap.length > 0
				?
				cartForMap.map((order, idx) => <div className="my-auto relative"><GoodInCart name={order[0].name} image={order[0].img} note={order[1]} number={dishesNum[idx]} cart={cart} setCart={setCart} /> <Divider /></div>)
				:
				<div className="text-2xl text-emerald-400 overline top-20 relative">購物車裡面沒東西喔~</div>
		}</div>
	)
}

export default ShoppingCartPage