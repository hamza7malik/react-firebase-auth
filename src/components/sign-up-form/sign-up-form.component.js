import { confirmPasswordReset } from 'firebase/auth';
import React, { useState, useContext } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState('');
  const { name, email, password, confirm_password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signup_user = async (e) => {
    setLoading('Loading...');
    e.preventDefault();
    console.log(formFields);
    if (password !== confirm_password) {
      alert('passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const response = await createUserFromAuth(user, { displayName: name });
      console.log(user);
      alert('User Added Successfully');

      setLoading('');
      resetFormFields();
      window.location.href = '/';
    } catch (error) {
      setLoading('');
      if (error.code === 'auth/email-already-in-use')
        alert('User already in use');
      console.log('Error creating user...', error);
    }
  };
  return (
    <div className='sign-up-form'>
      <h3>Sign-up</h3>
      <form onSubmit={signup_user}>
        <FormInput
          label={'Name'}
          placeholder='name'
          type={'text'}
          name='name'
          value={name}
          onChange={handleChange}
        />

        <FormInput
          label={'Email'}
          placeholder='email'
          type={'email'}
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label={'Password'}
          placeholder='password'
          type={'password'}
          name='password'
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label={'Confirm Password'}
          placeholder='confirm_password'
          type={'password'}
          name='confirm_password'
          value={confirm_password}
          onChange={handleChange}
        />

        <div>
          <button type='submit'>sign-up</button>
        </div>
      </form>
      {loading}
    </div>
  );
};

export default SignUpForm;
