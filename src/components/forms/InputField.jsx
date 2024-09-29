import React from 'react';

const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;