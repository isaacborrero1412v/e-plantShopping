import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity indoors.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy care indoor plant.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-vera-3283110_1280.jpg", description: "Soothes skin and purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828841_1280.jpg", description: "Calming fragrance.", cost: "$22" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/01/18/12/28/jasmine-3090098_1280.jpg", description: "Sweet floral scent.", cost: "$19" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herbal aroma.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/mint-1117567_1280.jpg", description: "Fresh minty scent.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/11/29/03/42/eucalyptus-1867073_1280.jpg", description: "Refreshing medicinal aroma.", cost: "$16" },
        { name: "Gardenia", image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/gardenia-2337722_1280.jpg", description: "Intense sweet scent.", cost: "$25" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2016/08/04/10/44/echinacea-1568800_1280.jpg", description: "Boosts immune system.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496783_1280.jpg", description: "Relieves digestive issues.", cost: "$11" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2015/07/10/17/48/lemon-balm-840081_1280.jpg", description: "Reduces stress.", cost: "$13" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/17/01/39/chamomile-1599427_1280.jpg", description: "Soothes sleep issues.", cost: "$12" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/19/09/54/calendula-4348396_1280.jpg", description: "Heals minor wounds.", cost: "$14" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/thyme-2305199_1280.jpg", description: "Antimicrobial properties.", cost: "$12" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="logo">Paradise Nursery</a>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, idx) => (
            <div key={idx} className="category-section">
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIdx) => {
                  const isAdded = addedNodes[plant.name] || cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={pIdx} className="product-card">
                      <img src={plant.image} alt={plant.name} className="product-image" />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="product-cost">{plant.cost}</p>
                      <button 
                        className="product-button" 
                        disabled={isAdded} 
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={(e) => { if(e) e.preventDefault(); setShowCart(false); }} />
      )}
    </div>
  );
}

export default ProductList;
