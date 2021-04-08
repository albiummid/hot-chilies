import React from 'react';
import './FoodCard.css'
const FoodCard = ({food,detailsOnClick}) => {
    const { image, description, price, name ,_id } =food;
    return (
        <div onClick={()=> detailsOnClick(_id)} className="food-card-container">
            <img src={image} alt="" />
            <h3>{ name }</h3>
            <p>{description}</p>
            <h2>$ {price} </h2>
        </div>
    );
};

export default FoodCard;