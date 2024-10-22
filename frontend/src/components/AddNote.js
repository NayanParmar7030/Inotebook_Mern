import React, { useContext, useState } from 'react'
import Notescontext from '../context/NotesContext'
const AddNote = () => {

    const context = useContext(Notescontext);
    const {addNote} = context;

    const initialNote = {
        title:"",
        description:"",
        tag:"default"
    };
    const [note,setNote] = useState(initialNote);
    const [Errors, setErrors]  = useState({});

    const handleOnChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    const validateForm = () => {
        let formErrors = {};
        if (!note.title.trim()) {
            formErrors.title = "Title is required";
        }
        if (!note.description.trim()) {
            formErrors.description = "Description is required";
        }
        return formErrors;
    };

    const handleOnclick = (e) => {

        e.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            addNote(note);
            setNote(initialNote); 
            setErrors({});
        } else {
            setErrors(formErrors);
        }
    }
    return (
        <div>
            <form onSubmit={handleOnclick}>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder='' onChange={handleOnChange}/>
                    {Errors.title && <small className="text-danger">{Errors.title}</small>}
                </div>
                <div className="form-group my-3">
                    <label for="description">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={handleOnChange} />
                    {Errors.description && <small className="text-danger">{Errors.description}</small>}
                </div>
                <div className="col-auto my-3">
                    <button type="submit" className="btn btn-primary mb-3" >Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;
