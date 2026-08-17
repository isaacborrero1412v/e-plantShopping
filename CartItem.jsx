import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', ''));
    return costNum * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} width="100" />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Subtotal: ${calculateTotalCost(item)}</p>
            <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        </div>
      ))}
      <div className="cart-buttons">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Checkout functionality Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;