import React, { useEffect, useState } from 'react';
import ManageCard from '../ManageCard/ManageCard';
import deleteIcon from '../../../images/delete.ico'
import './ManageBooks.css'
const ManageBooks = (props) => {
    const { handleDelete,handleEdit, setOption,option  } = props;
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const url = "http://localhost:5000/foods";
        fetch(url)
            .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    

    return (

        <div  className="manage-container">
            {option === "manage" ? 
            <h1 style={{textAlign:"center",marginBottom:"50px"}}> Manage Books</h1>:
            <h1 style={{textAlign:"center",marginBottom:"50px"}}> Edit Books</h1>
        }
            
            {
                props.children
            }
            <div className="manage-card-container">
                <ol>
                {
                        books.map(book => <li><ManageCard handleEdit={handleEdit} setOption={setOption} book={book} key={book._id}>
                            { option === "manage" &&
                                <button onClick={() => handleDelete(book._id)} > <img src={deleteIcon} alt="" /> </button>}
                        </ManageCard></li>)
                }
                </ol>
                
            </div>
        </div>
    );
};

export default ManageBooks;