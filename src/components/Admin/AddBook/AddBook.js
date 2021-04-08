import React from 'react';
import './AddBook.css'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useState } from 'react';
const AddBook = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const { setOption } = props;
    const onSubmit = data => {
        const bookInfo = {
            name: data.name,
            author: data.author,
            price: data.price,
            image: imageUrl
        }
        const url = `https://bongo-library-api.herokuapp.com/addBook`
        fetch(url, {
            method: "POST",
            headers:{
                "content-type": 'application/json'
            },
            body: JSON.stringify(bookInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Successfully Data Uploaded on Server 😍")
                    setOption("empty")
                    setOption("add")
                }
              
        })
       
    }
    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', 'b70ec09f117505d271f0a605e9978bb9');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
              setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
          });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h1>Add Book</h1>
            <div className="book-input">

            <div>  <fieldset>
                <legend>Name</legend>
                <input type="text" name="name" required ref={register}/>
            </fieldset>
           
            <fieldset>
                <legend >Description</legend>
                <input type="text" name="author" required ref={register}/>
            </fieldset></div>
            <div>
                 <fieldset>
                <legend>Add Price</legend>
                <input type="text" name="price" required ref={register}/>
            </fieldset>
           
            <fieldset>
                <legend>Add Book Cover Photo</legend>
                <input type="file" required onChange={handleImageUpload}/>
            </fieldset>
           </div>
          </div>
         <br/>
            {
                imageUrl ?<input type="submit" className=" btn" />  :
                    <p style={{color:"red",textAlign:"center"}}>Complete all field then submit button will appers</p>
           }
        </form>
    );
};

export default AddBook;