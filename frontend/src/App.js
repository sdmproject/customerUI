import './App.css';
import Menu from './Containers/Menu';
import { useEffect, useState } from 'react';
// instead of "Switch", in version 6, Switch is discarded
import {
  BrowserRouter,
  Routes, 
  Route,
  Link,
} from "react-router-dom";
import ShoppingCartPage from './Containers/ShoppingCartPage';

// BUG:cart在一開始傳給別的container時會是空的(雖然在App.js印出來是有東西的)，所以一定要進行至少一次頁面切換後，才能正確傳遞

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
  const [cart, setCart] = useState([])

  useEffect(() => {
    let cartTemp = {}
    for(let i = 0; i < dishes.length; i++){
      cartTemp[dishes[i].name] = []
    }
    setCart(cartTemp)
    console.log(cartTemp)
  // }, [dishes])
  }, [])
  //用假資料dishes不會更改
  
  return (
          
    <div className="App">
      <BrowserRouter>
        <Link to="/"><div>Menu</div></Link>
        <Link to="/cart"><div>cart</div></Link>
        <Routes>
          <Route exact path = "/" element={<Menu dishes={dishes} cart={cart} setCart={setCart}></Menu>}/>
          <Route path = "/cart" element={<ShoppingCartPage dishes={dishes} cart={cart} setCart={setCart}></ShoppingCartPage>}/> 
        </Routes> 
      </BrowserRouter> 
    </div>
  );
}

export default App;
