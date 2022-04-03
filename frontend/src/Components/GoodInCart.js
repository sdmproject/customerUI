import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import NumberSelector from "./NumberSelector"
const GoodInCart = ({name, image, note, number, cart , setCart}) =>{
	
	const [dishNum, setDishNum] = useState(number)
	
	useEffect(() => {
		console.log(name)
		console.log(note)
		console.log(number)
	}, []);

	const onClick_Change = () =>{
		let temp = cart
		let changeNum = dishNum - number >=0 ? dishNum - number : number - dishNum
		try{
			for(let i = 0; i < changeNum; i++){
				let removeIdx = temp[name].indexOf(note)
				if(removeIdx !== -1)
					temp[name].splice(removeIdx, 1) 
			}
			setCart(temp)
		}
		catch (e){
			console.log("There is some error in removing")
		}
	}

	return (
		<>
			<image href={image}></image>
			<span>{name}</span>
			<span>{note}</span>
			<NumberSelector dishNum={dishNum} setDishNum={setDishNum}></NumberSelector>
			<button onClick={onClick_Change}>change</button>
		</>
	) 
	
}

export default GoodInCart