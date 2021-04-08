import React from 'react';
import { useForm } from 'react-hook-form';
import ManageBooks from '../ManageBooks/ManageBooks';
import './EditBook.css'

const EditBooks = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const { handleEdit, showInput, selectedBook, editId, setOption } = props;
    const { name, author, price } = selectedBook;
    const onSubmit = data => {
        const editedData = { ...data };
        fetch(`https://localhost:5000/edit/${editId}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(editedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setOption("empty");
                    setOption("edit");
                    alert("Book Information Updated !")
                }
            })


    }
    return (
        <ManageBooks handleEdit={handleEdit}>
            <form onSubmit={handleSubmit(onSubmit)} className="manage-card-titles">
                <div>
                    <b> Name</b>
                    <br />
                    {
                        showInput &&
                        <div className="update-div">
                            <small style={{ color: "teal", fontWeight: "bold" }}>Previous Name:</small>
                            <br />
                            <small>{name}</small>
                            <br />
                            <input type="text" name="name" ref={register} />
                        </div>

                    }
                </div>
                <div>
                    <b>Descriptions</b>
                    <br />
                    {showInput &&
                        <div className="update-div">
                            <small style={{ color: "teal", fontWeight: "bold" }}>Previous description:</small>
                            <br />
                            <small>{author}</small>
                            <br />
                            <input type="text" name="author" ref={register} />

                        </div>
                    }

                </div>
                <div>
                    <b> Price</b>
                    <br />
                    {showInput &&
                        <div className="update-div">
                            <small style={{ color: "teal", fontWeight: "bold" }}>Previous Price:</small>
                            <br />
                            <small > $ {price}</small>
                            <br />
                            <input type="text" name="price" ref={register} />
                        </div>

                    }

                </div>
                <div>
                    <b> Action</b>
                    <br />
                    <br />
                    <br />
                    {showInput &&
                        <input type="submit" />
                    }

                </div>

            </form></ManageBooks>

    );
};

export default EditBooks;