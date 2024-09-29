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

    const handleOnChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleOnclick = (e) => {
        e.preventDefault();
        addNote(note);
        setNote(initialNote);
    }
    return (
        <div>
            <form onSubmit={handleOnclick}>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder='' onChange={handleOnChange}/>
                </div>
                <div className="form-group my-3">
                    <label for="description">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={handleOnChange} />
                </div>
                <div className="col-auto my-3">
                    <button type="submit" className="btn btn-primary mb-3" >Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;
