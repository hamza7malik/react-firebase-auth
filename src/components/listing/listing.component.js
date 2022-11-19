import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Listing = ({ users }) => {
  return (
    <Fragment>
      <div className='container'>
        <div className='row '>
          {users.map((item, index) => {
            return (
              <div key={index} className='col-md-3 mt-5'>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    src={`https://xsgames.co/randomusers/assets/avatars/pixel/${index}.jpg`}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>company: {item.company.name}</Card.Text>
                    <Card.Text>Email: {item.email}</Card.Text>
                    <Button variant='primary'>Contact</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Listing;
