import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FoodCard from '../FoodCard/FoodCard';
import './Home.css'
const Home = () => {
    const [breakfastFoods, setBreakfastFoods] = useState([]);
    const [lunchFoods, setLunchFoods] = useState([]);
    const [dinnerFoods, setDinnerFoods] = useState([]);
    const [navSelected, setNavSelected] = useState("lunch");
    useEffect(() => {
        fetch('http://localhost:5000/foods/Breakfast')
            .then(res => res.json())
            .then(data => setBreakfastFoods(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/foods/Lunch')
            .then(res => res.json())
            .then(data => setLunchFoods(data));
    }, []);
    
    useEffect(() => {
        fetch('http://localhost:5000/foods/Dinner')
            .then(res => res.json())
            .then(data => setDinnerFoods(data));
    }, []);

    const history = useHistory();
    const detailsOnClick = (id) => {
        history.push(`/food-details/${id}`)     
    }


    return (
        <div className="home-container">
            <div className="search-div">
                <h1>Best foods are waiting for your hungry stomac</h1>
                <div className="search-input">
                <input type="text"  placeholder="Search Your Desire !"/>
                <button>Search</button>
                </div>
          </div>
            <div className="food-container">
                <div className="food-nav">
                    <h3 className={navSelected === "breakfast" && "selected-nav"} onClick={()=>setNavSelected("breakfast")}>Breakfast</h3>
                    <h3 className={navSelected === "lunch" && "selected-nav"}  onClick={()=>setNavSelected("lunch")}>Lunch</h3>
                    <h3 className={navSelected === "dinner" && "selected-nav"}  onClick={()=>setNavSelected("dinner")}>Dinner</h3>

              
                </div>
           
            <div className="food-cards">
                    {navSelected === "breakfast" &&
                        breakfastFoods.map(food => <FoodCard key={food._id} detailsOnClick={detailsOnClick} food={food}/>)
                        
                } 
                    {navSelected === "lunch" &&
                        lunchFoods.map(food => <FoodCard key={food._id} detailsOnClick={detailsOnClick} food={food}/>)
                        
                } 
                    {navSelected === "dinner" &&
                        dinnerFoods.map(food => <FoodCard key={food._id} detailsOnClick={detailsOnClick} food={food}/>)
                        
                } 
                </div>
     <Link to="/orders">  <button  className="submit-btn">Checkout</button></Link>
           </div>
            <div className="reviews">
                
          </div>
        </div>
    );
};

export default Home;