import React from 'react';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...otherProps} />
    </div>
  );
};

export default FormInput;
