import React, { useState, UseState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';

import {
  signInWithGooglePopup,
  createUserFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const defaultValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [values, setValues] = useState(defaultValues);
  const { email, password } = values;

  const googleSignin = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserFromAuth(user);
      window.location.href = '/';
    } catch (error) {
      console.log('Error signing in', error);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const sign_in = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      window.location.href = '/';
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password');
          return;
        case 'auth/user-not-found':
          alert('No email associated with that email');
          return;
        default:
          console.log('Error signing in', error);
      }
    }
  };
  return (
    <div className='sign-in-form'>
      <h3>Sign-in</h3>
      <form onSubmit={sign_in}>
        <FormInput
          placeholder='email'
          label='Email'
          type={'email'}
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          placeholder='password'
          label='Password'
          type={'password'}
          name={'password'}
          value={password}
          onChange={handleChange}
        />
        <div className='sign-in-buttons'>
          <button type='submit'>sign-in</button>
          <button onClick={googleSignin}>Google Signin</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
