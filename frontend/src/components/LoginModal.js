import React, { useRef, useEffect, useState,useContext } from 'react';
import axios from 'axios';
import Notescontext from '../context/NotesContext';

function LoginModal({show, onClose,handleLoginData }) {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [errors,setErrors] = useState({});
    const notesdata = useContext(Notescontext);

    const {authToken} = notesdata;
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

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
      });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const validateFormError = (data) => {
        const formerrors = {};

        if(data.email == ''){
            formerrors.email = "Please enter email";
        }
        if(data.password == ''){
            formerrors.password = "Please enter password";
        }

        return formerrors;

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateForm = validateFormError(loginData);
        if(Object.keys(validateForm).length === 0){
            try {
                const postData = await axios.post(`${process.env.REACT_APP_BACKENED_API_URL}login`,{
                    email:loginData.email,
                    password:loginData.password
                })
               if(postData.data.authToken){
                localStorage.setItem('token',postData.data.authToken)
                handleLoginData(postData.data.authToken)
               }
            } catch (error) {
                console.error('error:', error.response.data);
                // setErrors({ apiError: 'Login failed. Please try again.' });
            }
            modalInstance.current.hide();
        }
        else{
            setErrors(validateForm);
        }
        // updateNoteCallBack(newNote);
        
    };

    const handleClose = () => {
        if (modalInstance.current) {
            modalInstance.current.hide();
        }
        onClose();  
    };

    return (
        <div className="modal fade" id="exampleModal" ref={modalRef} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="description">Email</label>
                                <input type="text" className="form-control" value={loginData.email} id="email" name="email" onChange={handleChange} />
                                {errors && errors.email ? <small className="text-danger">{errors.email}</small>:''}
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="description">Password</label>
                                <input type="password" className="form-control" value={loginData.password} maxLength={10} id="password" name="password" onChange={handleChange} />
                                {errors && errors.password ? <small className="text-danger">{errors.password}</small>:''}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Login</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
