import React, { useRef, useEffect, useState } from 'react';

function Modal({ title, show, note, onClose, updateNoteCallBack }) {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        if (window.bootstrap && modalRef.current) {
            modalInstance.current = new window.bootstrap.Modal(modalRef.current);

            if (show) {
                modalInstance.current.show();
            } else {
                modalInstance.current.hide();
            }
        }
    }, [show]);

    const [newNote, setNewNote] = useState(note || { title: '', description: '' });

    const handleChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNoteCallBack(newNote);
        modalInstance.current.hide();
    };

    const handleClose = () => {
        if (modalInstance.current) {
            modalInstance.current.hide();
        }
        onClose();  // Also trigger the parent component's onClose handler
    };

    return (
        <div className="modal fade" id="exampleModal" ref={modalRef} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" value={newNote.title} id="title" name="title" onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" value={newNote.description} id="description" name="description" onChange={handleChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
