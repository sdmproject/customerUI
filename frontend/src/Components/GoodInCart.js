import { useState, useEffect } from 'react';
import NumberSelector from "./NumberSelector"
const GoodInCart = ({name, image, note, number, cart , setCart}) =>{
	
	const [dishNum, setDishNum] = useState(number)
	

	const onClick_Change = () =>{
		let temp = cart
		console.log(dishNum)
		console.log(number)
		let changeNum = dishNum - number >=0 ? dishNum - number : number - dishNum
		try{
			// minus
			if(dishNum - number < 0)
				for(let i = 0; i < changeNum; i++){
						let removeIdx = temp[name].indexOf(note)
						if(removeIdx !== -1)
							temp[name].splice(removeIdx, 1) 
					}
			//add
			else if (dishNum + number > 0)
				for(let i = 0; i < changeNum; i++){
					temp[name].push(note)
				}
			setCart(temp)
			console.log(cart)
		}
		catch (e){
			console.log("There is some error in removing")
		}
	}

	return (
		<div className='top-4 '>
			<div className='pr-4 md:pr-20 lg:pr-30 xl:pr-40  inline-block'>
				<img src={image} className="pb-4 w-48 h-40"></img>
			</div>
			<div className='inline-block'>
				<div className='text-2xl lg:text-3xl text-sky-500'>{name}</div>
				<div>{note}</div>
				<NumberSelector dishNum={dishNum} setDishNum={setDishNum} Size="notsmall"></NumberSelector>
				<br/>
				<button onClick={onClick_Change} className="hover:bg-zinc-200">更改為此數量</button>
			</div>
		</div>
	) 
	
}

export default GoodInCart