import React from 'react';

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextAreaField;