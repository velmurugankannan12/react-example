import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from './customField';

const FormComponent = () => {
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Form state
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Error state
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate form
    const validate = (values) => {
        let errors = {};

        // Retrieve existing data from localStorage
        const existingData = JSON.parse(localStorage.getItem('userData')) || [];

        if (!values.name) {
            errors.name = 'Name is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        } else if (existingData.some(user => user.email === values.email)) {
            errors.email = 'Email already exists';
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const values = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        };

        const errors = validate(values);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setFormValues(values);
            setIsSubmitting(true);
        }
    };

    const handleCancel = () => {
        navigate('/')
    }

    // Effect for form submission
    useEffect(() => {
        if (isSubmitting) {
            const existingData = JSON.parse(localStorage.getItem('userData')) || [];

            const updatedData = [...existingData, formValues];

            localStorage.setItem('userData', JSON.stringify(updatedData));
            console.log('Form submitted successfully', formValues);
            setIsSubmitting(false);

            navigate('/');
        }
    }, [isSubmitting, formValues, navigate]);

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '20px', flexDirection: 'column' }}>

            <div>
                <InputField data="name" inputRef={nameRef} />
                {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
            </div>

            <div>
                <InputField data="email" inputRef={emailRef} />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
            </div>

            <div>
                <InputField data="password" inputRef={passwordRef} />
                {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
            </div>

            <div>
                <InputField data="confirmPassword" inputRef={confirmPasswordRef} />
                {formErrors.confirmPassword && <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={handleSubmit} type="submit" style={{ width: 'fit-content' }}>Submit</button>
                <button onClick={handleCancel} type="submit" style={{ width: 'fit-content' }}>Cancel</button>
            </div>

        </div>
    );
};

export default FormComponent;
