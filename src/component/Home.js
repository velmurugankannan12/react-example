import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EditInputField, ButtonField, PTag } from './customField';

const Grid = () => {
    const navigate = useNavigate();

    const [editIndex, setEditIndex] = useState(null);
    const [editValues, setEditValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditValues({
            ...editValues,
            [name]: value
        });
    };

    const handleEditSubmit = (index) => {
        // Validate the values
        const errors = validate(editValues);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const updatedFormData = formData.map((item, i) =>
            i === index ? { ...item, ...editValues } : item
        );
        localStorage.setItem('userData', JSON.stringify(updatedFormData));
        setEditIndex(null);
        window.location.reload();
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setFormErrors({});
    };

    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = 'Name is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    let formData;
    try {
        formData = JSON.parse(localStorage.getItem('userData'));
    } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        formData = [];
    }

    if (!Array.isArray(formData)) {
        formData = [];
    }

    const userAdd = () => {
        navigate('/form');
    }
    const userDelete = (data) => {
        const updatedFormData = formData.filter((e) => e.email !== data.email);
        localStorage.setItem('userData', JSON.stringify(updatedFormData));
        window.location.reload();
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '10px', padding: '20px' }}>
            <div onClick={userAdd} style={{ width: '150px', height: '150px', padding: '20px', border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <p>Add +</p>
            </div>

            {formData.map((e, index) => (
                <div key={index} style={{ width: 'auto', height: 'auto', padding: '20px', border: '1px solid gray', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    {editIndex === index ? (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>

                            <EditInputField name="name" value={editValues.name} onChange={handleEditChange} placeholder="Edit name" />
                            {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}

                            <EditInputField name="email" value={editValues.email} onChange={handleEditChange} placeholder="Edit email" />
                            {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}

                            <EditInputField type="password" name="password" value={editValues.password} onChange={handleEditChange} placeholder="Edit password" />
                            {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}

                            <EditInputField type="password" name="confirmPassword" value={editValues.confirmPassword} onChange={handleEditChange} placeholder="Confirm password" />
                            {formErrors.confirmPassword && <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>}

                            <div style={{ marginTop: '10px', display: 'flex', gap: '16px' }}>
                                <ButtonField onClick={() => handleEditSubmit(index)}>Save</ButtonField>
                                <ButtonField onClick={handleCancelEdit}>Cancel</ButtonField>
                            </div>

                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>

                            <PTag value={e.name} />
                            <PTag value={e.email} />

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <ButtonField onClick={() => { setEditIndex(index); setEditValues({ name: e.name, email: e.email, password: e.password || '', confirmPassword: e.password || '' }) }}>Edit</ButtonField>
                                <ButtonField onClick={() => userDelete(e)}>Delete</ButtonField>
                            </div>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Grid;
