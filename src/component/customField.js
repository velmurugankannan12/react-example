
export const InputField = ({ data, inputRef, value }) => {
    return (
        <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
            <label>{data}:</label>
            <input ref={inputRef} value={value} type={data === 'password' || data === 'confirmPassword' ? 'password' : 'text'} />
        </div>
    );
};

export const EditInputField = ({ name, value, onChange, placeholder, type = 'text' }) => {
    return (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={{ padding: '10px', marginBottom: '10px' }} />
    );
};

export const PTag = ({ value }) => {
    return (
        <p>{value}</p>
    );
};

export const ButtonField = ({ onClick, children, style }) => {
    return (
        <button onClick={onClick} style={{ ...style }}>
            {children}
        </button>
    );
};
