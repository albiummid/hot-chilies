import React, { useEffect, useState } from 'react';
import './FoodDetails.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
const FoodDetails = () => {
    const [remove,setRemove] = useState(false)
    const { id } = useParams();
    const [,,cartItems, setCartItems] = useContext(UserContext);
    const [selectedFood, setSelectedFood] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { _id, name, description, price, image } = selectedFood;
    useEffect(() => {
        fetch(`http://localhost:5000/food/${id}`)
            .then(res => res.json())
        .then(data => setSelectedFood(data))
    }, [])
    const randomId= ()=>{
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
   }

    console.log(cartItems);
    // cartHandler
    const cartHandler = (food) => {
        console.log(food);
        const alreadyAdded = cartItems.find(item => item._id === food._id);
        // console.log(alreadyAdded);
        food.quantity = quantity;
        const newCart = [...cartItems, food];
        setCartItems(newCart);
        setRemove(!remove)
        if (alreadyAdded) {
            const existingCart = cartItems.filter(item => item !== food);
            setRemove(!remove)
            console.log(existingCart);
            setCartItems(existingCart);
        }
        else {
            const newCart = [...cartItems, food];
            setCartItems(newCart);
            setRemove(!remove);
        }
    }


    // Quantity Handler
    const handleQuantity = (type) => {
        if (type === "increase") {
            setQuantity(quantity + 1);
        }
        else if(type === "decrease"){
            if (quantity > 1) {
                setQuantity(quantity -1)
                    }
                    else {
                        setQuantity(1)
                    }
        }
    }

    // Return
    return (
        <div className="food-details-container">
            <div className="food-details">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo exercitationem nesciunt hic praesentium, ipsum, voluptatem vel voluptate perspiciatis alias aperiam eius nam in molestias laudantium dolorum cumque porro dolores! Vel praesentium eius eum vitae. Repellendus praesentium natus debitis eos sequi dicta, neque eaque beatae rem doloremque! Facere numquam sunt cumque reiciendis inventore perspiciatis aliquam veritatis assumenda, quaerat, nisi in cupiditate?</p>
                <div className="price-div">
                   <h1>$</h1> <h2>{price}</h2>  <div className="quantity-div">
                        <button onClick={()=> handleQuantity("increase")} ><FontAwesomeIcon icon={faPlus} /></button><h3>{quantity}</h3><button onClick={() =>  handleQuantity("decrease")}><FontAwesomeIcon icon={faMinus} /></button> </div>
                </div>
                {
                    remove ?
                    <button onClick = {()=> cartHandler(selectedFood)} className="btn btn-cart"><FontAwesomeIcon icon={faShoppingCart} /> Remove Cart</button> : <button onClick = {()=> cartHandler(selectedFood)} className="btn btn-cart"><FontAwesomeIcon icon={faShoppingCart} /> Add</button>
                }
            </div>
            <div className="food-image"><img src={image} alt=""/></div>
        </div>
    );
};

export default FoodDetails;