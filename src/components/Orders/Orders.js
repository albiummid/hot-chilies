import React, { useEffect, useState } from 'react';
import './Order.css'
import { useForm } from "react-hook-form";
import CartCard from "../CartCard/CartCard";
import SummaryCard from '../SummaryCard/SummaryCard';
import { useSelector } from 'react-redux';
const Orders = () => {
    const [inputData, setInputData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [quantity, setQuantity] = useState(0);
    const loggedInUser = useSelector(state => {
        return state.user.loggedInUser?.[0];
    });

    const cartItems = useSelector((state) => {
        return state.foods.cartItems;
    });
    const { register, handleSubmit } = useForm();
    const [userOrders, setUserOrders] = useState([]);
    const [updateState, setUpdateState] = useState(false);
    useEffect(() => {
        const url = `https://hot-chilies.herokuapp.com/userOrders?email=${loggedInUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUserOrders(data))
    }, [updateState]);

    // handle delete
    const handleOrderDelete = (id) => {
        const url = `https://hot-chilies.herokuapp.com/deleteOrder/${id}`;
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
        cartItems.map((item) => {
            item.userName = userName;
            item.date = date;
            item.email = email;
            item.phone = phone;
            item.adress = address;
            delete item._id;
            return item; //for adding additional details

        })
        fetch('https://hot-chilies.herokuapp.com/addOrder', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cartedItems)
        })
            .then(res => res.json())
            .then(data => {
                alert("Sucessfully Order Submited");
                setUpdateState(!updateState)
            })
    }
    // let totalPrice = cartItems && cartItems.reduce((total, food) => total + Number(food.price), 0);
    // const total = totalPrice.toFixed(2);


    // Quantity Handler
    const handleQuantity = (type, id, itemCount) => {
        setQuantity(itemCount);
        if (type === "increase") {
            cartItems.filter(item => {
                if (item._id === id) {
                    let updateQuantity = itemCount + 1;
                    setQuantity(updateQuantity);
                    item.quantity = updateQuantity;
                }
                return item;
            })
        }
        else if (type === "decrease") {
            if (quantity > 1) {
                cartItems.filter(item => {
                    if (item._id === id) {
                        let updateQuantity = quantity - 1;
                        setQuantity(updateQuantity);
                        item.quantity = updateQuantity;;
                    }
                    return item;
                })
            }
        }
        return handleQuantity;
    }

    const handleData = (event) => {
        let isFieldValid = false;
        if (event.target.name === "address") {
            isFieldValid = true;

        }
        if (event.target.name === "userName") {
            isFieldValid = true;

        }
        if (event.target.name === "phone") {

            isFieldValid = event.target.value.length > 7;
        }

        if (isFieldValid) {
            const data = { ...inputData };
            data[event.target.name] = event.target.value;
            setInputData(data);
        }

    }


    return (
        <div className="order-page">
            <div className="ordered-container">
                <h1 style={{ textAlign: "center" }}>Your Orders</h1>

                {userOrders.length === 0 ?
                    <div className="empty-div">
                        <p>You didn't any order !</p>
                    </div>
                    : <div className='oredered_card_container'>
                        {
                            userOrders.map((order, index) => <SummaryCard key={index} handleOrderDelete={handleOrderDelete} order={order} />)
                        }
                    </div>
                }

            </div>

            { cartItems.length > 0 &&
                <div className="order-container">
                    <h1 style={{ textAlign: "center" }}>Cart Items : {cartItems.length}</h1>


                    <div className='order_info'>
                        <p> From: Pallibidut , Savar Cantonment .</p>
                        <p>Arrival Time : 1 hours remaining</p>
                        <p> To : {inputData.address}</p>
                        <p> Customer Name: {inputData.userName}</p>
                        <p>Contact No. : {inputData.phone} </p>
                    </div>
                    <div>

                        {
                            cartItems.map((food, index) => <CartCard key={index} handleQuantity={handleQuantity} food={food} />)
                        }

                    </div>



                    <div className="order-info">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <fieldset>
                                <legend>Name</legend>
                                <input onChange={handleData} type="text" defaultValue={loggedInUser.name} name="userName" ref={register} required />
                            </fieldset>

                            <fieldset>
                                <legend>Email</legend>
                                <input type="text" defaultValue={loggedInUser.email} name="email" ref={register} required />
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