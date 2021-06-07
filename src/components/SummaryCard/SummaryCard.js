import React from 'react';
import './SummaryCard.css'
import deleteIcon from '../../images/delete.ico'
const SummaryCard = (props) => {
    const { name, image, date, _id, quantity } = props.order;
    const { handleOrderDelete } = props;
    return (
        <div className="summary-card">
            <div className="food-preview">
                <img src={image} alt="" />
                <div className='order_details' style={{ textAlign: "justify" }}>
                    <div>
                        <p>Name: {name}  </p>
                        <p>Quantity: {quantity} </p>
                        <p> Order Date : {date}  </p>
                    </div>
                </div>

            </div>
            <button
                className="delete-btn"
                onClick={() => handleOrderDelete(_id)}>
                <img style={{ width: "20px" }} src={deleteIcon} alt="" />
            </button>
        </div>
    );
};

export default SummaryCard;