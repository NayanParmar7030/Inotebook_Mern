import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';


function SignupModal({show, onClose }) {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [errors,setErrors] = useState({});

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

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
      });

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const validateFormError = (data) => {
        const formerrors = {};

        if(data.name == ''){
            formerrors.name = "Please enter name";
        }
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

        const validateForm = validateFormError(registerData);
        if(Object.keys(validateForm).length === 0){
            try {
                const postData = await axios.post(`${process.env.REACT_APP_BACKENED_API_URL}createuser`,{
                    name:registerData.name,
                    email:registerData.email,
                    password:registerData.password
                })
                console.log('User signed up successfully:', postData.data);
            } catch (error) {
                console.error('Signup error:', error.response.data);
                setErrors({ apiError: 'Signup failed. Please try again.' });
            }
            // modalInstance.current.hide();
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
                        <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input type="text" className="form-control" value={registerData.name} id="name" name="name" onChange={handleChange} />
                                {errors && errors.name ? <small className="text-danger">{errors.name}</small>:''}
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="description">Email</label>
                                <input type="text" className="form-control" value={registerData.email} id="email" name="email" onChange={handleChange} />
                                {errors && errors.email ? <small className="text-danger">{errors.email}</small>:''}
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="description">Password</label>
                                <input type="password" className="form-control" value={registerData.password} maxLength={10} id="password" name="password" onChange={handleChange} />
                                {errors && errors.password ? <small className="text-danger">{errors.password}</small>:''}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Signup</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
