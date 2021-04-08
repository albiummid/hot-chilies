import React, { useContext, useEffect, useState } from 'react';
import './Order.css'
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import CartCard from "../CartCard/CartCard";
import SummaryCard from '../SummaryCard/SummaryCard';
const Orders = () => {
    const [inputData, setInputData] = useState({
        name: '',
        phone: '',
        address:''
    });
    const [quantity, setQuantity] = useState(0);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [, , cartItems, setCartItems] = useContext(UserContext);
    console.log(cartItems);
    const { register, handleSubmit } = useForm();
    const [userOrders, setUserOrders] = useState([]);
    const [updateState,setUpdateState] = useState(false)
    useEffect(() => {
        const url = `http://localhost:5000/userOrders?email=${loggedInUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUserOrders(data))
    }, [updateState]);

    // handle delete
    const handleOrderDelete = (id) => {
        const url = `http://localhost:5000/deleteOrder/${id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Your Order Successfully Removed !");
                    setUpdateState(!updateState);
                }
            })

    }


    const onSubmit = (data) => {
        const date = new Date().toDateString().toString();
        const { userName, email, phone, address } = data;
        const cartedItems = [...cartItems];
        cartItems.map(item => {
            item.userName = userName;
            item.date = date;
            item.email = email;
            item.phone = phone;
            item.adress = address;
            delete item._id;
            return item;

        })
        fetch('http://localhost:5000/addOrder', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cartedItems)
        })
            .then(res => res.json())
        .then(data => {
            alert("Sucessfully Order Submited");
            setUpdateState(!updateState)
    } )
        // console.log(processingOrders);
    }
    let totalPrice = cartItems && cartItems.reduce((total, food) => total + Number(food.price), 0);
    const total = totalPrice.toFixed(2)

    const handleCartDelete = (id) => {
        console.log("delete", id);
        const newCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(newCartItems);
        console.log(cartItems.length);
    }


    // Quantity Handler
    const handleQuantity = (type, id, itemCount) => {
        console.log(id,type,itemCount);
        // for tracking countity
        setQuantity(itemCount);
        if (type === "increase") {
            cartItems.find(item => {
                if (item._id === id) {
                    let updateQuantity = itemCount + 1;
                     // for tracking countity
                    setQuantity(updateQuantity);
                    item.quantity = updateQuantity;
                    console.log(item);
                }
                return item;
            })

        }
        else if (type === "decrease") {
            if (quantity > 1) {
                cartItems.find(item => {
                    if (item._id === id) {
                        let updateQuantity = quantity - 1;
                         // for tracking countity
                        setQuantity(updateQuantity);
                        item.quantity = updateQuantity;
                        // console.log(item);
                    }
                    return item;
                })
            }
        }
        return handleQuantity;
    }
    const handleData = (event) => {
        console.log(event.target.name);
        let isFieldValid = true;
        if (event.target.name === "address") {
            isFieldValid = true;
    
        }
        if (event.target.name === "userName") {
            isFieldValid = true;

        }
        if (event.target.name === "phone") {
            isFieldValid = true;

        }

        if (isFieldValid) {
        const data = {};
        data[event.target.name] = event.target.value;
        setInputData(data);
        }

        
        
    }
// console.log(inputData);


    return (
        <div className="order-page">
            <div className="ordered-container">
                <h1 style={{ textAlign: "center" }}>Your Orders</h1>

                {userOrders.length === 0 ?
                    <div className="empty-div">
                        <p>You didn't any order !</p>
                    </div>
                    : <div>
                        {
                            userOrders.map(order => <SummaryCard handleOrderDelete={handleOrderDelete} order={order} />)
                        }
                    </div>
                }

            </div>

            { cartItems.length > 0 &&
                <div className="order-container">
                    <h1 style={{ textAlign: "center" }}>Cart Items : {cartItems.length}</h1>


                    <div>
                       <p> From: Pallibidut , Savar Cantonment .</p>
                        <p>Arrival Time : 1 hours remaining</p>
                    <p> To : {inputData.address}</p>
                    <p> Customer Name: {inputData.userName}</p>
                    <p>Contact No. : {inputData.phone} </p>
                    </div>
                    <div>

                        {
                            cartItems.map(food => <CartCard handleQuantity={handleQuantity} handleCartDelete={handleCartDelete} food={food} />)
                        }

                    </div>



                    <div className="order-info">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <fieldset>
                                <legend>Name</legend>
                                <input onChange={handleData} type="text"  defaultValue={loggedInUser.name} name="userName" ref={register} required />
                            </fieldset>

                            <fieldset>
                                <legend>Email</legend>
                                <input  type="text" defaultValue={loggedInUser.email} name="email" ref={register} required />
                            </fieldset>
                            <fieldset>
                                <legend>Phone</legend>
                                <input onChange={handleData} type="text" name="phone" ref={register} required />
                            </fieldset>
                            <fieldset>
                                <legend>Address</legend>
                                <input type="text" onChange={handleData} name="address" ref={register} required />
                            </fieldset>

                            <div className=" btn-div">

                                <input type="submit" className="btn " />

                            </div>
                        </form>

                    </div>
                </div>
            }

        </div>
    );
};

export default Orders;