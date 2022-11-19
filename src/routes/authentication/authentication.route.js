import React from 'react';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Authentication = () => {
  return (
    <div>
      <div className='Sign-in'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <SignInForm></SignInForm>
            </div>

            <div className='col-md-6'>
              <SignUpForm></SignUpForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
