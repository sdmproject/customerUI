import './App.css';
import Menu from './Containers/Menu';
import { useEffect, useState } from 'react';
const dishes = [
	{name:"義大利麵", image:"./1.jpg", type:"主食", price:1000, description:"好吃的義大利麵"},
	{name:"冰淇淋", image:"./2.jpg", type:"甜點", price:100, description:"好吃的冰淇淋"},
	{name:"白飯", image:"./3.jpg", type:"主食", price:10, description:"好吃的白飯"},
	{name:"燙青菜", image:"./4.jpg", type:"配菜", price:50, description:"好吃的蔡"},
	{name:"可樂", image:"./5.jpg", type:"飲料", price:30, description:"好吃的飲料"},
	{name:"雪碧", image:"./6.jpg", type:"飲料", price:30, description:"好吃的雪碧"},
	{name:"生菜沙拉", image:"./7.jpg", type:"沙拉", price:88, description:"好吃的沙拉"},
]
function App() {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    let cartTemp = {}
    for(let i = 0; i < dishes.length; i++){
      cartTemp[dishes[i].name] = []
    }
    setCart(cartTemp)
  }, [dishes])
  
  return (
    <div className="App">
      <Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>
    </div>
  );
}

export default App;
