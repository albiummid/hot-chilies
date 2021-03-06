import React from 'react';
import './CartCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import deleteIcon from '../../images/delete.ico'
const CartCard = ({handleCartDelete,handleQuantity,food}) => {
    const { name, price,_id ,quantity,image } = food;
    return (
        <div className="cart-card-container">            
            <div className="card-catagory">
            <div className="card-catagory-image">
                  <img src={image} alt=""/>  
                    </div>
                <div className="card-catagory-info">
                    <p>{name}</p>
                    <p style={{color:"red"}}>$ {price}</p>
                    <p>delevery fee</p>
                </div>
                
                <div className="card-catagory-action">
                
                <div className="quantity-div">
                        <button onClick={() => handleQuantity("increase", _id, quantity)} ><FontAwesomeIcon icon={faPlus} /></button><h3>{quantity}</h3><button onClick={() => handleQuantity("decrease", _id, quantity)}><FontAwesomeIcon icon={faMinus} /></button> </div>
                        <button className="delete-btn" onClick={() => handleCartDelete((_id))}><img  src={deleteIcon} alt="" /> </button>
                </div>
                
             
            </div>
            
        </div>
    );
};

export default CartCard;