import React from 'react'

function NoteItems(props) {
   const {note} = props;
    return (
        
            <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body  my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div></div>
    )
}
export default NoteItems