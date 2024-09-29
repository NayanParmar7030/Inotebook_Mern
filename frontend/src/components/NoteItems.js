import React, { useContext, useState } from 'react';
import Notescontext from '../context/NotesContext';
import Modal from './Modal';  

function NoteItems(props) {
    const { note } = props;
    const context = useContext(Notescontext);
    const { deleteNote,updateNote } = context;

    const [modalVisible, setModalVisible] = useState(false);
    

    const handleDelete = (id) => {
        deleteNote(id);
    };

    const handleUpdate =async (data) => {
       const updateNoteData =  await updateNote(data);
       props.alertData(updateNoteData);
    }

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className='col-md-3 my-3'>
            
            <div className="card">
                <div className="card-body my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => handleDelete(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={handleOpenModal}></i>
                </div>
            </div>
            <Modal
                title={`Edit Note - ${note.title}`} 
                show={modalVisible}
                note={note}
                onClose={handleCloseModal}
                updateNoteCallBack= {(param)=>handleUpdate(param)}
            />
        </div>
    );
}

export default NoteItems;
