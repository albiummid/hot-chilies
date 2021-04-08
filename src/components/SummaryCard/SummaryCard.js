import React from 'react';
import './SummaryCard.css'
import deleteIcon from '../../images/delete.ico'
const SummaryCard = (props) => {
    const { name, price, image, description, date,_id ,quantity} = props.order;
    const { handleOrderDelete } = props;
    return (
        <div className="summary-card">
            <div className="book-preview">
                <img src={image} alt="" />
                <div style={{textAlign:"justify"}}> <p>Name: {name}  </p>
                    <p> description : {description}  </p>
                    <p> Order Date : {date}  </p>
                     <p>Quantity: {quantity} </p>
            <p>Price : $  {price}</p>
                </div>
            </div>
            <div >
                <button className="delete-btn" onClick={() => handleOrderDelete(_id)}><img  style={{width:"30px"}} src={deleteIcon} alt=""/></button>
                
            </div>
           
        </div>
    );
};

export default SummaryCard;