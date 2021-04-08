import React from 'react';
import './ManageCard.css'
import editIcon from '../../../images/pencil.png'
const ManageCard = (props) => {
   
    const { name, author, price, _id } = props.book;
    const { handleEdit, setOption} = props;
    return (
        <div className="manage-card">
            <p> {name} </p>
            <p> {author} </p>
            <p> $ {price} </p>
            <div className="action-div">
                <button  onClick={() => handleEdit(_id)} > <img  src={editIcon} alt="" /> </button>  {
                        props.children
                }
            </div>
        </div>
    );
};

export default ManageCard;