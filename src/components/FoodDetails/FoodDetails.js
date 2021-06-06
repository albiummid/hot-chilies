import React, { useEffect, useState } from 'react';
import './FoodDetails.css'
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/foodActions';
const FoodDetails = () => {
    const dispatch = useDispatch();
    const [isCarted, setIsCarted] = useState(false)
    const { id } = useParams();
    const [selectedFood, setSelectedFood] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { name, description, price, image } = selectedFood;
    useEffect(() => {
        fetch(`https://hot-chilies.herokuapp.com/food/${id}`)
            .then(res => res.json())
            .then(data => setSelectedFood(data))
    }, [id]);
    // Quantity Handler
    const handleQuantity = (type) => {
        if (type === "increase") {
            setQuantity(quantity + 1)
        }
        else if (type === "decrease") {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
            else {
                setQuantity(1)
            }

        }
    }

    // Return
    return (
        <div className="food-details-container">
            <div className="food-image">
                <img src={image} alt="" />
            </div>
            <div className="food-details">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo exercitationem nesciunt hic praesentium, ipsum, voluptatem vel voluptate perspiciatis alias aperiam eius nam in molestias laudantium dolorum cumque porro dolores! Vel praesentium eius eum vitae. Repellendus praesentium natus debitis eos sequi dicta, neque eaque beatae rem doloremque! Facere numquam sunt cumque reiciendis inventore perspiciatis aliquam veritatis assumenda, quaerat, nisi in cupiditate?</p>
                <div className="price-div">
                    <h1>$</h1> <h2>{price}</h2>  <div className="quantity-div">
                        <button onClick={() => handleQuantity("increase")} ><FontAwesomeIcon icon={faPlus} /></button><h3>{quantity}</h3><button onClick={() => handleQuantity("decrease")}><FontAwesomeIcon icon={faMinus} /></button> </div>
                </div>
                {
                    isCarted ?
                        <button
                            onClick={() => {
                                dispatch(removeFromCart(selectedFood));
                                setIsCarted(!isCarted)
                            }}
                            className="btn btn-cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                             Remove Cart
                             </button>
                        :
                        <button
                            onClick={() => {
                                dispatch(addToCart({ ...selectedFood, quantity: quantity }));
                                setIsCarted(!isCarted)
                            }}
                            className="btn btn-cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                             Add
                             </button>
                }
            </div>
        </div>
    );
};

export default FoodDetails;