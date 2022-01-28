import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import {useState} from 'react';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {
  const [cartIsshown,setCartIsshown] = useState(false);
  const showcarthandler = () =>{
    setCartIsshown(true);
  };
  const hidecarthandler = ( ) => {
    setCartIsshown(false);
  };

  return (
    <CartProvider>
      {cartIsshown && <Cart onClose={hidecarthandler}/>}
      <Header onShowCart={showcarthandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
};

export default App;
