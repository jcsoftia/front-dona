import React from 'react';

import Card from '../Shared/Components/UIElements/Card';
import DonationItem from './DonationItem';
import './DonationList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className={`donation-list center ${props.classNames}`}>
        <Card>
          <h2>No donations found. </h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={`donation-list center ${props.classNames}`}>
      {props.items.map(donation => (
        <DonationItem
          key={donation._id}
          id={donation._id}
          productName={donation.productName}
          description={donation.description}
          state={donation.state}
          isDonated={props.isDonated}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
